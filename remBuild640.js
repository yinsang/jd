// 计算rem进行计算
!(function (doc, win) {
        "use strict";
        if(window.location.href.indexOf("jshop.jd.com")>0){return false};
        var fontScale;
        fontScale = function(){
            var innerWidth = win.innerWidth;
            if (!innerWidth) {
                return false;
            }
            // 不用计算的rem 640
            doc.documentElement.style.fontSize = (50 * innerWidth / 320)  + 'px';
            // 750
            // doc.documentElement.style.fontSize = (20 * innerWidth / 273)  + 'px';
        };
        fontScale();
        win.addEventListener('resize', fontScale, false);
    })(document, window);
// 限制懒加载
window.addEventListener("load",function(){
    var aImg=document.querySelectorAll(".wrap img"),
        src;
    if(window.location.href.indexOf("sale.jd.com")!=-1){
        for(var i=0;i < aImg.length;i++){
            (function(index){
                if(aImg[index].getAttribute("data-srcset")){
                    src=aImg[index].getAttribute("data-srcset");
                    aImg[index].src=src;
                }
            })(i)
        };
    }
},false);
