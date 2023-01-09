interface Action {
    title:string;
    message:string;
}

export const errorReducer = (state='',action:Action)=>{
    switch(action.title){
        case "warning":
            return state + action.message
        default:
            return state
    }
}