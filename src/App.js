import React from 'react'
import JoinBlock from "./Components/JoinBlock";
import reducer from "./reducer"
import socket from './socket'
import Chat from "./Components/Chat";

function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: []
    });
    const onLogin = (obj) =>{
         dispatch({
             type: 'JOINED',
             payload: obj,
         })
        socket.emit('ROOM:JOIN', obj)

    }

    React.useEffect(() => {
        socket.on('ROOM:JOINED', (users) => {
            console.log('Новый пользователь' ,users)
            dispatch({
                type:'SET-USERS',
                payload:users
            })
        })
    }, []);
    window.socket = socket

    return (
    <div className={'wrapper'}>
        {!state.joined
            ? <JoinBlock onLogin={onLogin}/>
        : <Chat {...state} />}
    </div>
  );
}

export default App;
