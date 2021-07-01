const express = require('express')
const path = require('path')
const http = require('http')
const port = 80

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let drawings = []

io.on('connection', socket => {
    console.log('Socket conectado ' + socket.id)

    socket.emit('previousDrawings', drawings)

    socket.on('sendDrawing', data => {
        drawings.push(data)
        console.log(drawings.length)
        socket.broadcast.emit('receivedDrawing', data)
    })
})

server.listen(port, () => {
    console.log('listening on port ' + port)
})