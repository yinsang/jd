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
                var countNone = 0;
                var NoneArray = [];
                for (var i = 0; i < wrapImg.length; i++) {
                    var E1 = wrapImg[i].getAttribute("src").replace('images/', '')
                    if(tableJson[E1] == undefined){
                      countNone ++
                      NoneArray.push(E1)
                    }
                 if(wrapImg[i].getAttribute("src").match("images/")){
                  wrapImg[i].setAttribute("src", "http:" + tableJson[E1]);
                 }
                    
                }
                if(countNone){
                       alert('未替换'+countNone+'个---'+NoneArray)
                }
                var wrap=document.querySelectorAll(".wrap2 a");
                // alert(wrap.length)
                for(var i=0;i<wrap.length;i++){
                    wrap[i].setAttribute("target","_blank")
                    wrap[i].setAttribute("clstag","jr|keycount|" +document.title+ "|i")
                }
            }
