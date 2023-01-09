export const errorState = (errorTitle:string,errorMessage:string)=>{
    return (dispatch: any)=>{
        dispatch({
            Title:errorTitle,
            message:errorMessage
        })
    }
}