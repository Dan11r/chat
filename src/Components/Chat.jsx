import React from 'react';

import socket from '../socket'
const Chat = ({users, roomId, message, userName, onSetMessage}) => {
    console.log(users)
    const [MessageText, setText] = React.useState('');
    const messageRef = React.useRef(null)

    const onSendMessage = () =>{
        socket.emit('ROOM:NEW-MESSAGE', {
            userName,
            roomId,
            text: MessageText
        })
        onSetMessage({
            userName,
            text: MessageText})
        setText('')
    }
    React.useEffect(()=>{
        messageRef.current.scrollTo(0, 99999999)
    },[message])
        return (
            <div className="chat">
                <div className="chat-users">
                    Комната: <b>{roomId}</b>
                    <hr />
                    <b>Онлайн ({users.length}):</b>
                    <ul>
                        {users && users.map((user)=><li key={user}>{user}</li>)}
                    </ul>
                </div>
                <div className="chat-messages">
                    <div ref={messageRef} className="messages">
                        {message.map((m, i) => <div key={m + i} className="message">
                            <p>{m.text}</p>
                            <div>
                                <span>{m.userName}</span>
                            </div>
                        </div>)}

                    </div>
                    <form>
          <textarea onChange={(e) => setText(e.currentTarget.value)}
                    value={MessageText} className='form-control'></textarea>
                        <button onClick={onSendMessage}  type="button" className="btn btn-primary">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        );
};

export default Chat;
