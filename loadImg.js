//本地代码的images/1.png需要替成线上的http链接，写个小插件来实现下，并添加埋点。
//并在页面复用时设置img和a变为空
var wypSup = (function(){
    class supFoo {
        constructor (){
        }
        loadSpace(){
            const aLink = document.querySelectorAll("a")
            const aImg = document.querySelectorAll("img")
            const nodeListToArray = (nodeList)=>{
                let arr = []
                nodeList.forEach(function(item, index){
                    arr.push(item)
                })
                return arr
            }
            nodeListToArray(aLink).forEach(function(e){
                if(e.getAttribute("href").slice(0,2) == "ht" || e.getAttribute("href").slice(0,2) == "//"){
                    e.setAttribute("href", "#")
                }
            })
            nodeListToArray(aImg).forEach(function(e){
                if(e.getAttribute("src").slice(0,2) == "ht" || e.getAttribute("src").slice(0,2) == "//"){
                    if(e.className.indexOf("dont-change")  == -1){
                        e.setAttribute("src", "images/")
                    }
                }
            })
            alert("a链接和img已被初始化")
        }
        loadImg(){
            //删除头部
            var aHead = document.querySelectorAll(".wrap1 thead");
            console.log(aHead, typeof aHead)
            aHead.forEach(function(item, index){
                item.innerHTML=""
            })
            var aTr = document.querySelectorAll(".wrap1 tr");
            var tableJson = {};
            //遍历表格，剔除相同名称的覆盖
            aTr.forEach(function(item, index){
                let trT = item.querySelector(".file_title").innerHTML;
                let trSrc = item.querySelector(".btn-primary").getAttribute("href");
                console.log(trSrc)
                if(tableJson[trT] == undefined){
                    tableJson[trT] = trSrc;
                }
            })

            var wrapImg = document.querySelectorAll(".wrap2 img");
            console.log(tableJson)
            var countNone = 0;
            var NoneArray = [];
            //赋值于本地dom
            wrapImg.forEach(function(item, index){
                var E1 = item.getAttribute("src").replace('images/', '')
                if(tableJson[E1] == undefined){
                    countNone ++
                    NoneArray.push(E1)
                }
                //只替换images/开头的，剔除https和http
                if(item.getAttribute("src").match("images/") && tableJson[E1] != undefined){
                    item.setAttribute("src", "http:" + tableJson[E1]);
                }
            })
            //弹出未成功个数
            if(countNone){
                alert('未替换'+countNone+'个---'+NoneArray)
            }
            var wrap=document.querySelectorAll(".wrap2 a");
            // alert(wrap.length)
            // 加埋点
            wrap.forEach(function(item, index){
item.setAttribute("target","_blank")
                item.setAttribute("clstag","jr|keycount|" +document.title+ "|" + i)
            })
        }
    }
    return supFoo
})()
var wyp = new wypSup()
