import { FC, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Box, Container, CssBaseline } from "@mui/material";

interface MainLayoutProps {
    children: ReactNode;
}


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="flex h-screen">
            <CssBaseline />

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <Box component="main" className="flex-grow bg-gray-100 h-screen overflow-auto">
                <Header
                    onLogout={handleLogout}
                    onSidebarOpen={() => setIsSidebarOpen(true)}
                    isSidebarOpen={isSidebarOpen}
                />
                <Container maxWidth="lg" className="mt-4 mb-4">
                    <Outlet />
                </Container>
                <Footer />
            </Box>

        </div>
    )
}

export default MainLayout;