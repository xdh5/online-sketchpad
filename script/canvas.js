var canvas = document.querySelector("canvas")
var pen = canvas.getContext("2d")
var eraser = false

document.querySelector("#pen").onclick = function(){
    eraser = false
    document.querySelector("#pen").classList.add("actionsIcon")
    document.querySelector("#eraser").classList.remove("actionsIcon")
}
document.querySelector("#eraser").onclick = function(){
    eraser = true
    document.querySelector("#eraser").classList.add("actionsIcon")
    document.querySelector("#pen").classList.remove("actionsIcon")
}
document.querySelector("#delete").onclick = function(){
    pen.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
}
document.querySelector("#download").onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = "我的作品"
    a.target = "_blank"
    a.click()
}

//换颜色
function changeColor(){
    var color = document.querySelectorAll(".color")
    for(var i = 0;i<color.length;i++){
        color[i].onclick = function(event){
            pen.fillStyle = this.id
            pen.strokeStyle = this.id
            for(var i = 0;i<color.length;i++){
                color[i].classList.remove("actionsColor")
            }
            this.classList.add("actionsColor")
        }
    }
}

//执行函数
autoResize()
listenToUser(canvas)
changeColor()

//设置画布大小为屏幕大小
function setCanvasSize(canvas) {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

//跟随屏幕大小调整画布
function autoResize(){
    setCanvasSize(canvas)
    window.onresize = function(){
        setCanvasSize(canvas)
    }
}

//绘制图画
function drawLine(x1, y1, x2, y2) {
    pen.beginPath();
    pen.moveTo(x1, y1) // 起点
    pen.lineWidth = 2
    pen.lineTo(x2, y2) // 终点
    pen.stroke()
    pen.closePath()
}

//监听用户动作
function listenToUser(canvas){
    var using = false
    var lastPoint = {x: undefined, y: undefined}
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(event){
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            using = true
            if(eraser){
                pen.clearRect(x - 5, y - 5, 20, 20)
            }
            else{
                lastPoint = {"x": x,"y": y}
            }
        }
        canvas.ontouchmove = function(event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            if(!using){
                return
            }
            if(eraser){
                pen.clearRect(x - 5, y - 5, 20, 20)
            }
            else{
                newPoint = {"x": x,"y": y}
                drawLine(lastPoint.x, lastPoint.y ,newPoint.x ,newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function(){
            using = false
        }
    }
    else{
        canvas.onmousedown = function(event){
            var x = event.clientX
            var y = event.clientY
            using = true
            if(eraser){
                pen.clearRect(x - 5, y - 5, 20, 20)
            }
            else{
                lastPoint = {"x": x,"y": y}
            }
        }
        canvas.onmousemove = function(event) {
            event.stopPropagation()
            event.preventDefault();
            var x = event.clientX
            var y = event.clientY
            if(!using){
                return
            }
            if(eraser){
                pen.clearRect(x - 5, y - 5, 20, 20)
            }
            else{
                newPoint = {"x": x,"y": y}
                drawLine(lastPoint.x, lastPoint.y ,newPoint.x ,newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function(){
            using = false
        }
    }
}