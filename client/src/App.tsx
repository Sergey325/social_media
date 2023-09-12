import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import {useSelector} from "react-redux"
import {RootState} from "./index";
import ToasterProvider from "./providers/ToasterProvider";
import ChatPage from "./scenes/chatPage";

function App() {
    const mode = useSelector((state: RootState) => state.mode)
    const isAuth = Boolean(useSelector((state: RootState) => state.token))

    useEffect(() => {
        if (mode !== "light") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [mode])

    return (
        <div className="min-h-full flex flex-col flex-grow bg-bkg-default transition duration-300">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route
                        path="/home"
                        element={isAuth ? <HomePage/> : <Navigate to={"/"}/>}
                    />
                    <Route
                        path="/profile/:userId"
                        element={isAuth ? <ProfilePage/> : <Navigate to={"/"}/>}
                    />
                    <Route
                        path="/chat"
                        element={isAuth ? <ChatPage/> : <Navigate to={"/"}/>}
                    />
                </Routes>
            </BrowserRouter>
            <ToasterProvider/>
        </div>
    );
}

export default App;
