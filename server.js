const express = require('express')



const app = express()

const server = require('http').Server(app)

const io = require('socket.io')(server)

app.use(express.json())

const rooms = new Map()

app.get('/rooms/:id', (req, res)=>{
    const {id : roomId} = req.params
    console.log(roomId)
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        message: [...rooms.get(roomId).get('messages').values()]
    } : {users: [], message: []}
    res.json(obj)
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
        socket.to(roomId).emit('ROOM:SET-USERS', users)
    })
    socket.on('ROOM:NEW-MESSAGE', ({roomId, userName, text})=>{
        const obj = {
            userName,
            text
        }
        rooms.get(roomId).get('messages').push(obj)
        socket.broadcast.to(roomId).emit('ROOM:NEW-MESSAGES', obj)
    })

    socket.on('disconnect', ()=>{
        rooms.forEach((value, roomId) =>{
            if(value.get('users').delete(socket.id)){
                const users = [...rooms.get(roomId).get('users').values()];
                console.log('qwd')
                socket.broadcast.to(roomId).emit('ROOM:SET-USERS', users)
            }
        })
    })
})



server.listen(9999, (err)=>{
    if(err){
        throw Error(err)
    }
    console.log('server запущен')
})