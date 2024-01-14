let canvas = document.getElementById("canvas2d")
let context = canvas.getContext("2d")
let drawColor

function DrawLine(){

    context.beginPath()
    let xStart = Math.random() * (300 - 10) + 10 // from 10 to 300
    let yStart = Math.random() * (600 - 10) + 10 //from 10 to 600
    let endX =  Math.random() * (600 - 290) + 290 //from 290 to 600
    let endY =  Math.random() * (600 - 290) + 290 //from 290 to 600

    context.moveTo(xStart, yStart)
    context.lineTo(endX, endY)

    context.strokeStyle = drawColor
    context.stroke()
    
}

function DrawRectangle(x, y, width, height){

    context.beginPath()
    context.fillStyle = drawColor
    context.fillRect(x, y, width, height)
    
    // console.log("x: " + x)
    // console.log("y: " + y)
    // console.log("width: " + width)
    // console.log("height: " + height)
}

function DrawCircle(x, y, radius){
    context.beginPath();
    context.fillStyle = drawColor;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function DrawText(text, x, y) {

    context.beginPath()
    context.fillStyle = drawColor
    context.font = "bold 48px poppins"
    context.fillText(text, x, y)
}

function DrawRainbow(){

    
    context.lineWidth = 18

    let rainbowColors = [
        "#CC0000", 
        "#FF6600", 
        "#FFCC00", 
        "#00CC00",
        "#99FFFF", 
        "#0066FF",
        "#9900FF"
    ]

    let radius = 50
    
    for (let i = 0; i < 7; i++){

            context.strokeStyle = rainbowColors[i]
            context.beginPath()
            context.arc(400, 400, radius * i + radius, 0, Math.PI, true)
            context.stroke()
    }
}

function ClearCanvas() {

    let draw_div = document.getElementById("draw")
    context.fillStyle = draw_div.style.backgroundColor
    context.clearRect(0,0, canvas.clientWidth, canvas.clientHeight)
}

let buttons = document.getElementsByClassName("button")

for (let button of buttons) {

    button.onmouseover = () => {

        button.style.cursor = "pointer"
        button.style.filter = "grayscale(30%) opacity(50%)"
    }

    button.onmouseout = () => {

        button.style.filter = "grayscale(0%)"
    }
}


function Regular(xCenter, yCenter, radius) {

    let count = document.getElementById("vertices-count").value
    let angle = 0 //-Math.PI / 2
    let deltaAngle =  (2 * Math.PI) / count

    context.beginPath()

    for (let i = 0; i < count; i++){

        let currentX = xCenter + Math.cos(angle) * radius
        let currentY = yCenter + Math.sin(angle) * radius

        if (i == 0 ){

            context.moveTo(currentX, currentY)
        }

        else  {
            context.lineTo(currentX, currentY)
        }

        angle +=deltaAngle
    }

    context.closePath()
    context.strokeStyle = drawColor
    context.stroke()

}

function Star(xCenter, yCenter, radiusOuter, radiusInner) {

    let count = document.getElementById("rays-count").value
    let angle = 0 //-Math.PI / 2
    let deltaAngle =  (2 * Math.PI) / count / 2
    let currentX
    let currentY

    context.beginPath()

    for (let i = 0; i < count * 2; i++){

        
        if ( i % 2 == 0 ){

            currentX = xCenter + Math.cos(angle) * radiusOuter
            currentY = yCenter + Math.sin(angle) * radiusOuter
        }
       
        else {

            currentX = xCenter + Math.cos(angle) * radiusInner
            currentY = yCenter + Math.sin(angle) * radiusInner

        }

        if (i == 0 ){

            context.moveTo(currentX, currentY)
        }

        else  {
            context.lineTo(currentX, currentY)
        }

        angle +=deltaAngle
    }

    context.closePath()
    context.fillStyle = drawColor
    context.fill()


}

document.getElementById("line").onclick = () => {

    DrawLine()
}


document.getElementById("rectangle").onclick = () => {

    DrawRectangle(
        Math.random() * (700 - 10) + 10, // from 10 tp 700,
        Math.random() * (750 - 50) + 50, // from 50 to 750,
        Math.random() * (400 - 20) + 20, // from 20 to 400,
        Math.random() * (400 - 20) + 20 // from 20 to 400
    )
}

document.getElementById("circle").onclick = () => {
    DrawCircle(
         Math.random() * (700 - 10) + 10,
         Math.random() * (400 - 20) + 20,
         Math.random() * (250 - 50) + 10   
    );
}

document.getElementById("clear").onclick = () => {

    ClearCanvas()
}


document.getElementById("text").onclick = () => {

    DrawText(
        document.getElementById("text-field").value,
        Math.random() * (700 - 20) + 20, // from 20 to 700,
        Math.random() * (700 - 20) + 20 // from 20 to 700
    )
}


document.getElementById("rainbow").onclick = () => {

    DrawRainbow()
}

document.getElementById("regular").onclick = () => {

    Regular(400, 400, Math.random() * (400 - 50) + 50)

}

document.getElementById("star").onclick = () => {


    Star(
        Math.random() * (700 - 50) + 50, 
        Math.random() * (700 - 50) + 50, 
        Math.random() * (400 - 100) + 100, 
        Math.random() * (100 - 10) + 10
    )
}

document.getElementById("colorPicker").onchange = () => {

    drawColor = document.getElementById("colorPicker").value
}