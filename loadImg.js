window.addEventListener("load", function() {
    //删除头部
    var aHead = document.querySelectorAll(".wrap1 thead");
    for(var i = 0; i < aHead.length; i++){
        aHead[i].innerHTML=""
    }
    var aTr = document.querySelectorAll(".wrap1 tr");
    var tableJson = {};
    //遍历表格，剔除相同名称的覆盖
    for (var i = 0; i < aTr.length; i++) {
        var trT = aTr[i].querySelector(".file_title").innerHTML;

        var trSrc = aTr[i].querySelector(".btn-primary").getAttribute("href");
        console.log(trSrc)
        if(tableJson[trT] == undefined){

            tableJson[trT] = trSrc;
        }
    }
    var wrapImg = document.querySelectorAll(".wrap2 img");
    console.log(tableJson)
    var countNone = 0;
    var NoneArray = [];
    //赋值于本地dom
    for (var i = 0; i < wrapImg.length; i++) {
        var E1 = wrapImg[i].getAttribute("src").replace('images/', '')
        if(tableJson[E1] == undefined){
            countNone ++
            NoneArray.push(E1)
        }
        //只替换images/开头的，剔除https和http
        if(wrapImg[i].getAttribute("src").match("images/") && tableJson[E1] != undefined){
            wrapImg[i].setAttribute("src", "http:" + tableJson[E1]);
        }

    }
    //弹出未成功个数
    if(countNone){
        alert('未替换'+countNone+'个---'+NoneArray)
    }
    var wrap=document.querySelectorAll(".wrap2 a");
    // alert(wrap.length)
    // 加埋点
    for(var i=0;i<wrap.length;i++){
        wrap[i].setAttribute("target","_blank")
        wrap[i].setAttribute("clstag","jr|keycount|" +document.title+ "|" + i)
    }
})
