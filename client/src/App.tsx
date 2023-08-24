import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import {useSelector} from "react-redux"
import {RootState} from "./index";

function App() {
    const mode = useSelector((state : RootState) => state.mode)

    useEffect(() => {
        if(mode !== "light") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else{
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [mode])

    return (
        <div className="h-full bg-bkg-default transition">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/profile/:userId" element={<ProfilePage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
