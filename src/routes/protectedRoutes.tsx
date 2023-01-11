import { Outlet } from 'react-router'
import { LogIn } from '../Pages/LogIn';
import { MainPage } from '../Pages/MainPage';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

//routes logged in people can't access
export const ProtectedUnauthenticatedRoutes = () => {
    const userInfo = useSelector((state: RootState) => state.userInfo)
    return (
        !userInfo.isLoggedIn ? <Outlet /> : <MainPage />
    )
}

//routes only logged in people can access
export const ProtectedAuthenticatedRoutes = () => {
    const userInfo = useSelector((state: RootState) => state.userInfo)
    return (
        userInfo.isLoggedIn ? <Outlet /> : <LogIn />
    )
}
