import React from 'react'
import JoinBlock from "./Components/JoinBlock";
import reducer from "./reducer"
import socket from './socket'
import Chat from "./Components/Chat";
import axios from "axios";

function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomId: null,
        message: [],
        userName: null,
        users: []
    });
    const onLogin =  async (obj) =>{
         dispatch({
             type: 'JOINED',
             payload: obj
         })
        socket.emit('ROOM:JOIN', obj)
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        console.log(data)
        dispatch({
            type:'SET-DATA',
            payload:data
        })
    }

const setUsers = users =>{
    console.log('Новый пользователь' ,users)
    dispatch({
        type:'SET-USERS',
        payload:users
    })
}
const setMessage = (message) =>{
    dispatch({
        type:'NEW-MESSAGE',
        payload: message
    })
}

    React.useEffect(() => {
        socket.on('ROOM:SET-USERS', setUsers)
        socket.on('ROOM:NEW-MESSAGES', setMessage)

    }, []);
    window.socket = socket

    return (
    <div className={'wrapper'}>
        {!state.joined
            ? <JoinBlock onLogin={onLogin}/>
        : <Chat {...state} onSetMessage={setMessage} />}
    </div>
  );
}

export default App;
