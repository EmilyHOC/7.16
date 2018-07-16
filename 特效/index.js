$(function () {
    var liNum=5*5*5;

    //拖拽和滚轮
    (function () {

        var nowX, lastX, minusX, nowY, lastY, minusY;

        var roY = 0, roX = 0, tZ = -2000;

        var timer1, timer2;

        $(document).mousedown(function (ev) {

            ev = ev || window.event;
            lastX = ev.clientX;
            lastY = ev.clientY;

            $(this).on('mousemove', function (ev) {
                ev = ev || window.event; //ev 事件对象 存放事件的相关信息

                nowX = ev.clientX;  // ev.clientX  clientX属性存放鼠标x坐标
                nowY = ev.clientY;
                clearInterval(timer1);
                minusX = nowX - lastX;  // 两者差值
                minusY = nowY - lastY;

                roY += minusX * 0.2;
                roX -= minusY * 0.2;

                $('#main').css({
                    'transform': 'translateZ(' + tZ + ') rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });


                lastX = nowX; // 存放前一点的x坐标
                lastY = nowY;
            });

            return false;

        }).mouseup(function () {
            $(this).off('mousemove');
            timer1 = setInterval(function () {
                minusX *= 0.9;
                minusY *= 0.9;
                if (Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5) {
                    clearInterval(timer1);
                }
                roY += minusX * 0.2;
                roX -= minusY * 0.2;
                $('#main').css({
                    'transform': 'translateZ(' + tZ + ') rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
            }, 13)

        }).mousewheel(function (e, d) {//滚轮事件
            //var d=arguments[1];//arguments不定参,实参的集合
            //console.log(d);
            clearInterval(timer2);
            tZ += d * 80;
            tZ = Math.min(0, tZ); // Math.min()  取参数里面最小的
            tZ = Math.max(-8000, tZ); // Math.max()  …… 最大
            // -8000 < tZ < 0
            $('#main').css({
                'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });
            timer2 = setInterval(function () {
                d *= 0.95;
                //console.log(d);
                if (Math.abs(d) < 0.01) {
                    clearInterval(timer2);
                }
                tZ += d * 80;
                tZ = Math.min(0, tZ); // Math.min()  取参数里面最小的
                tZ = Math.max(-8000, tZ); // Math.max()  …… 最大
                // -8000 < tZ < 0
                $('#main').css({
                    'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });

            }, 13);

        })

    })()
    init();

function init() {

    for(var i=0;i<liNum;i++){
        /*把li变成jquery对象*/
        var $li=$('<li></li>');
        var x=(Math.random()-0.5)*5000;
        var y=(Math.random()-0.5)*5000;
        var z=(Math.random()-0.5)*5000;
        $li.css({
            'transform':'translate3d('+x+'px,'+y+'px,'+z+'px)'
        });

        $('#main').append($li);
    }
    setTimeout(function () {
        Grid();
    },300);
    $('#styleBtn li').click(function () {
        var index=$(this).index();
        switch (index){
            case 0:
                break;
            case 1:
                break;
            case 2:
                Helix();
                break;
            case 3:
        }
    });
}


function Grid() {

    var tX = 300, tY = 300, tZ = 500;
    var firstX = -2 * tX;//第一个水平偏移量
    var firstY = -2 * tY;
    var firstZ = -2 * tZ;
    $('#main li').each(function (i) {
            var iX = (i % 25) % 5;
            /*x方向要增加的倍数*/
            /*水平取余,垂直取商*/
            var iY = parseInt((i % 25) / 5);
            var iZ = parseInt(i / 25);
            $(this).css({
                'transform': 'translate3d(' + (firstX + iX * tX) + 'px,' + (firstY + iY * tY) + 'px,' + (firstZ + iZ * tZ) + 'px)',
                'transition': '4s ease-in-out '
            });
        }
    )
}

    function Helix(){
        var roY = 10 , tY = 10;
        var mIndex = Math.floor($('#main li').length / 2);
        var firsttY = -tY*mIndex;
        $('#main li').each(function(i){
            $(this).css({
                'transform' : 'rotateY('+ 10*i +'deg) translateY('+ (firsttY+tY*i) +'px) translateZ(1000px)'
            });
        })
    }






});

/*$(<li></li>)创建li节点,把这个节点变成jq对象*/
