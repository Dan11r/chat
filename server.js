const express = require('express')



const app = express()

const server = require('http').Server(app)

const io = require('socket.io')(server)

app.use(express.json())

const rooms = new Map([

])

app.get('/wd', (req, res)=>{
    res.json(rooms)
})

app.post('/rooms', (req, res)=>{
    const {roomId} = req.body
    if(!rooms.has(roomId)){
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send()
})

io.on('connection', (socket)=>{
    socket.on('ROOM:JOIN', ({roomId, userName})=>{
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()];
        console.log('qwd')
        socket.broadcast.to(roomId).emit('ROOM:JOINED', users)
    })
})

server.listen(9999, (err)=>{
    if(err){
        throw Error(err)
    }
    console.log('server запущен')
})