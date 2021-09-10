import React from 'react';

const Chat = ({users}) => {
    console.log(users)
        return (
            <div className="chat">
                <div className="chat-users">
                    Комната: <b>User1</b>
                    <hr />
                    <b>Онлайн ({users.length}):</b>
                    <ul>
                        {users && users.map((user)=><li>{user}</li>)}
                    </ul>
                </div>
                <div className="chat-messages">
                    <div className="messages">
                            <div className="message">
                                <p>weqwdqwdqwdqwdqwdqwd</p>
                                <div>
                                    <span>wedwed</span>
                                </div>
                            </div>
                    </div>
                    <form>
          <textarea className='form-control'></textarea>
                        <button  type="button" className="btn btn-primary">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        );
};

export default Chat;
