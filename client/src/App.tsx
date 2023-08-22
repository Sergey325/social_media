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
        if(mode === "dark") {
            document.documentElement.classList.add("dark");
        } else{
            document.documentElement.classList.remove("dark");
        }
    }, [mode])

    return (
        <div className="">
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
