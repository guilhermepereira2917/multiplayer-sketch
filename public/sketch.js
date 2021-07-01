let userColor;

function setup() {
    createCanvas(800, 800)
    background(0)
    noStroke()
    userColor = color(random(255), random(255), random(255))
    fill(userColor)
}

function draw() {
    drawCircle();
}

function renderCircle(circleObject) {
    fill(circleObject.color)
    circle(circleObject.x, circleObject.y, 64)
}

function drawCircle() {
    const mouseInsideCanvas = mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
    if (mouseIsPressed && mouseInsideCanvas) {
        const userCircle = {
            x: mouseX,
            y: mouseY,
            color: userColor.levels
        }

        console.log(userCircle)
        renderCircle(userCircle)

        socket.emit('sendDrawing', userCircle)
        console.log('circleSent')
    }
}

var socket = io('http://179.233.12.17:80')

socket.on('previousDrawings', (drawings) => {
    for (let circle of drawings) {
        renderCircle(circle)
    }
})

socket.on('receivedDrawing', (drawing) => {
    renderCircle(drawing)
})