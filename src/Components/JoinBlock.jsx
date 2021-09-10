import React from 'react';
import socket from '../socket'
import axios from 'axios'


const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const onEnter = async () =>{
        if(!roomId || !userName){
            alert('наверные данные')
        }
        if(roomId || userName){
            setIsLoading(true)
            const obj = {
                roomId,
                userName
            }
           await axios.post('/rooms',obj).then(() => onLogin(obj))
        }

        console.log(roomId, userName)
    }
    return (
        <div className="join-block">
            <input
                type="text"
                placeholder="Room ID"
                onChange={(e)=>setRoomId(e.target.value)}
                value={roomId}
            />
            <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            <button disabled={isLoading} onClick={onEnter}  className="btn btn-success">
                {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
            </button>
        </div>
    );
};

export default JoinBlock;