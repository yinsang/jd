"use strict";
const aLink = document.querySelectorAll("a")
const aImg = document.querySelectorAll("img")
const nodeListToArray = (nodeList)=>{
    let arr = []
    for(let i = 0, len = nodeList.length; i <len; i++){
        arr.push(nodeList[i])
    }
    return arr
}
nodeListToArray(aLink).forEach(function(e){
	e.setAttribute("href", "#")

})
nodeListToArray(aImg).forEach(function(e){
	e.setAttribute("src", "images/")

})
alert("a链接和img已被初始化")
