export default (state, action) =>{
    switch (action.type) {
        case 'JOINED':
            return{
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        case 'SET-USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET-DATA':
            return {
                ...state,
                users: action.payload.users,
                message: action.payload.message
            }
        case 'NEW-MESSAGE':
            return {
                ...state,
                message: [...state.message, action.payload]
            }
            default:
                return state
    }
}