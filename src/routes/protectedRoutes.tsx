import { Outlet } from 'react-router'
import { LogIn } from '../Pages/LogIn';
import { MainPage } from '../Pages/MainPage';

//routes logged in people can't access
export const ProtectedUnauthenticatedRoutes = (props:{isAuthenticated:boolean}) => {
    return (
        !props.isAuthenticated ? <Outlet /> : <MainPage />
    )
}

//routes only logged in people can access
export const ProtectedAuthenticatedRoutes = (props:{isAuthenticated:boolean,setIsAuthenticated:(value: boolean) => void}) => {
    return (
        props.isAuthenticated ? <Outlet /> : <LogIn login={(state:boolean)=>props.setIsAuthenticated(state)} />
    )
}
