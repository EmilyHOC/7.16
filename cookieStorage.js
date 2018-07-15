/*
* 本类实现像localStorage和sessionStorage一样的存储API,基于HTTP cookies实现
* */
function cookieStorage(maxage,path) {//两个参数分别存储有效期和作用域
    //获取一个存储全部cookie信息的对象
    var cookie=(function(){ //类似之前介绍的getcookie对象
        var cookie={};
        var all=document.cookie; //在一个大写字符串中获得所有的cookie值
        if(all="") //属性值为空字符串
            return cookie; //返回一个空对象
        var list=all.split(";");//分离出名/值对
        for(var i=0;i<list.length;i++){ /*遍历每个cookie值*/
            var cookie=list[i];
            var p=cookie.indexOf("=");//查找第一个等号
            var name=cookie.substring(0,p);//获取cookie名字
            var value=cookie.substring(p+1);//获取cookie对应的值
            value=decodeURIComponent(value);//对其值进行解码
            cookie[name]=value;//将名/值对存储到对象中

        }
        return cookie;
    }());
    //将所有的cookie的名字存储在一个数组中
    var keys=[];
    for(var key in cookie)
        keys.push(key);
    //现在定义存储公共API公共的属性和方法
    this.length=keys.length;

    //返回第n个cookie的名字,如果n越界则返回null
    this.key=function (n) {
        if(n<0||n>=keys.length)
            return null;
        return keys[n];
    }
    //返回指定名字的cookie值,如果不存在返回null
    this.getItem=function (name) {
        return cookie[name]||null;
    }
    //存储cookie的值
    this.setItem=function (key,value) {
        if(!(key in cookie)){
            keys.push(key); //将指定的名字加入到存储所有存储cookie名字的数组中
            this.length++;//cookie个数加一
        }
        //将名值存储到cookie对象中
        cookie[name]=value;

        //开始正式设置cookie
        //首先将要存储的cookie的值进行编码,同时创建一个"名字=编码后的值"形式的字符串
        var cookie=key+"="+encodeURIComponent(value);

        //将cookie的属性也加入到该字符串中
        if(maxage) cookie +=";max-age="+maxage;
                if(path) cookie+=";path="+path;

                //设置cookie的值
        document.cookie=cookie;

    };
    //删除指定的cookie
    this.removeItem=function (key) {
        if(!(key in cookie))
            return;
        //从内部维护的cookie组删除指定的cookie
        delete  cookie[key];
    }
    //同时将cookie中的名字也在内部的数组中删除
    for(var i=0;i<keys.length;i++){
        if(keys[i]===key){
            keys.splice(i,1);
            break;
        }
    }
    this.length--;
};
//删除所有的cookie
this.clear=function () {
    //循环所有的cookie的名字,并将cookie删除
    for(var i=0;i<keys.length;i++)
        document.cookie=keys[i]+"=;max-age=0";
    //重置所有的内部状态
    cookie={};
    keys=[];
    this.length=0;
};