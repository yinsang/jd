 window.onload=function() {
    var aHead = document.querySelectorAll(".wrap1 thead");
    for(var i = 0; i < aHead.length; i++){
        aHead[i].innerHTML=""
    }
     var aTr = document.querySelectorAll(".wrap1 tr");
     var tableJson = {};

     
     for (var i = 0; i < aTr.length; i++) {

        
         var trT = aTr[i].querySelector(".file_title").innerHTML;

         var trSrc = aTr[i].querySelector(".btn-primary").getAttribute("href");
         console.log(trSrc)

         tableJson[trT] = trSrc;
     }  
     var wrapImg = document.querySelectorAll(".wrap2 img");
     console.log(tableJson)
     for (var i = 0; i < wrapImg.length; i++) {

         var E = new RegExp(wrapImg[i].getAttribute("src").replace('images/', ''));
         var E1 = wrapImg[i].getAttribute("src").replace('images/', '')
         wrapImg[i].setAttribute("alt", "京东平台商品");
         for (var name in tableJson) {
             // if (E.test(name)) {
             //     wrapImg[i].setAttribute("src", tableJson[name]);

             //     //                                delete tableJson[name];

             // }
             // console.log(E1,name)
             if (E1 ==name) {
                 wrapImg[i].setAttribute("src", tableJson[name]);
                 // console.log(i)

             

             }
         }
            
         

     }
     var wrap=document.querySelectorAll(".wrap2 a");
     for(var i=0;i<wrap.length;i++){
         wrap[i].setAttribute("clstag","jr|keycount|jrGongYi1026|"+(i+1))
         wrap[i].setAttribute("target","_blank")
     }
 }
