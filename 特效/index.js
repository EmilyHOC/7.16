$(function () {
    var liNum=5*5*5;
    var tX=300,tY=300,tZ=500;
    var firstX=-2*tX;//第一个水平偏移量
    var firstY=-2*tY;
    var firstZ=-2*tZ;

    for(var i=0;i<liNum;i++){
        /*把li变成jquery对象*/
        var $li=$('<li></li>');

        var iX=(i%25)%5;/*x方向要增加的倍数*/ /*水平取余,垂直取商*/
        var iY=parseInt((i%25)/5);
        var iZ=parseInt(i/25);
        $li.css({
            'transform':'translate3d('+(firstX+iX*tX)+'px,'+(firstY+iY*tY)+'px,'+(firstZ+iZ*tZ)+'px)',

        });
        $('#main').append($li);
    }

});

(function () {
    var nowX,lastX,minusX;
    var roY=0;
    $(document).mousedown(function () {
        ev=ev||window.event;
        lastX=ev.clientX;
        $(this).on('mousemove',function (ev) {

            var nowX=ev.clientX;//clientX属性存放鼠标x坐标
            minusX=nowX-lastX;//插值
            roY+=minusX;
            $('#main').css({
                'transform':'translateZ(0px) rotate(0deg) rotateY('+roY+'deg)'
            })
            lastX=nowX; //前一点的x坐标
        });
    }).mouseup(function () {
        this.off('mousemove');
    })
})();

/*$(<li></li>)创建li节点,把这个节点变成jq对象*/