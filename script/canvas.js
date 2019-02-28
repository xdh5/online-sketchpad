var canvas = document.querySelector("canvas")
var pen = canvas.getContext('2d')
var eraser = false

document.querySelector("#pen").onclick = function(){
    eraser = false
    document.querySelector("#pen").classList.add('actionsIcon')
    document.querySelector("#eraser").classList.remove('actionsIcon')
}
document.querySelector("#eraser").onclick = function(){
    eraser = true
    document.querySelector("#eraser").classList.add('actionsIcon')
    document.querySelector("#pen").classList.remove('actionsIcon')
}
document.querySelector("#delete").onclick = function(){
    pen.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
}
document.querySelector("#download").onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的作品'
    a.target = '_blank'
    a.click()
}
document.querySelector("#red").onclick = function(){
    pen.fillStyle = 'red'
    pen.strokeStyle = 'red'
    red.classList.add('actionsColor')
    green.classList.remove('actionsColor')
    blue.classList.remove('actionsColor')
  }
  document.querySelector("#green").onclick = function(){
    pen.fillStyle = 'green'
    pen.strokeStyle = 'green'
    red.classList.remove('actionsColor')
    green.classList.add('actionsColor')
    blue.classList.remove('actionsColor')
  }
  document.querySelector("#blue").onclick = function(){
    pen.fillStyle = 'blue'
    pen.strokeStyle = 'blue'
    red.classList.remove('actionsColor')
    green.classList.remove('actionsColor')
    blue.classList.add('actionsColor')
  }
//执行函数
autoResize()
listenToUser(canvas)

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
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if(eraser){
                pen.clearRect(x - 5, y - 5, 10, 10)
            }
            else{
                lastPoint = {"x": x,"y": y}
            }
        }
        canvas.ontouchmove = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(!using){
                return
            }
            if(eraser){
                pen.clearRect(x - 5, y - 5, 10, 10)
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
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraser){
                pen.clearRect(x - 5, y - 5, 10, 10)
            }
            else{
                lastPoint = {"x": x,"y": y}
            }
        }
        canvas.onmousemove = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if(!using){
                return
            }
            if(eraser){
                pen.clearRect(x - 5, y - 5, 10, 10)
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