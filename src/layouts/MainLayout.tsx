import { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const dispatch = useDispatch()    
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header onLogout={handleLogout}/> 
            <main className="flex-grow p-4">
                <Outlet/>
            </main>
            <Footer /> 
        </div>
    )
}

export default MainLayout;