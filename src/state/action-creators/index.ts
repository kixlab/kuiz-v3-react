export const errorState = (errorTitle:string,errorMessage:string)=>{
    return (dispatch:Function)=>{
        dispatch({
            Title:errorTitle,
            message:errorMessage
        })
    }
}