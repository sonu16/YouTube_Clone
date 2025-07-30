import { RxHamburgerMenu } from "react-icons/rx";
import { BsYoutube } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Login from "../Login/Login.jsx";
import axios from "axios";
import "./Navbar.css";


function Navbar({ toggleSidebar, sidebarOpen, searchValue, setSearchValue }) {
    const [isFocused, setIsFocused] = useState(false);
    const [userAvatarPic, setUserAvatarPic] = useState("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="); // Placeholder for user avatar
    const [userModel, setUserModel] = useState(false);
    const [login, setLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const navigate = useNavigate();

    const handleClickUserModel = () => {
        setUserModel(prev => !prev);
    }

    const toggleBarFunction = () => {
        toggleSidebar(!sidebarOpen);
    }

    const handleProfile = () => {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setUserModel(false);
    }

    const setLoginModel = () => {
        setLogin(false);
    }

    const onClickOption = (button) => {
        setUserModel(false);
        if (button === "login") {
            setLogin(true);
        } else {
            localStorage.clear();
            getLogoutFun();
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);
        }
    }

    const getLogoutFun = async () => {
        axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true }).then((res) => {
            console.log("Logged out Successfully")
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        let userAvatar = localStorage.getItem('userAvatar');
        setIsLoggedIn(localStorage.getItem('userId') !== null ? true : false);
        if (userAvatar !== null) {
            setUserAvatarPic(userAvatar);
        }
    }, [])
    console.log(userAvatarPic);

    return (
        <div className="navbar">
            <div className="left_navbar">
                <div className="hamburger" onClick={toggleBarFunction}>
                    <RxHamburgerMenu size={25} />
                </div>
                <Link to={'/'} className="youtube_logo">
                    <BsYoutube size={30} style={{ color: "red" }} />
                </Link>
                <div className="youtube_text">
                    YouTube<sup style={{ fontSize: "10px", padding: "0 5px" }}>IN</sup>
                </div>
            </div>

            <div className="middle_navbar">
                <div className="search_bar">
                    {isFocused && (
                        <span className="search_icon_left">
                            <CiSearch size={18} />
                        </span>
                    )}
                    <input type="text" placeholder="Search" className="search_input"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{ paddingLeft: isFocused ? "30px" : "10px" }} />
                </div>
                <div className="search_icon" size={30}>
                    <CiSearch size={20} />
                </div>
                <div className="mic_icon">
                    <FaMicrophone size={20} />
                </div>
            </div>

            <div className="right_navbar">
                <Link to={'/123/upload'} className="plus_icon">
                    <FaPlus size={20} /><sup>Create</sup>
                </Link>
                <div className="notification_icon">
                    <GoBell size={20} />
                </div>
                <div className="profile_icon">
                    <img onClick={handleClickUserModel} src={userAvatarPic} alt="User Avatar" style={{ width: "35px", borderRadius: "50%" }} />
                </div>

                {userModel &&
                    <div className="user_model">
                        {isLoggedIn && <div className="user_model_options" onClick={handleProfile}>Profile</div>}
                        {!isLoggedIn && <div className="user_model_options" onClick={() => onClickOption("login")}>Login</div>}
                        {isLoggedIn && <div className="user_model_options" onClick={() => onClickOption("logout")}>Logout</div>}
                    </div>
                }
            </div>

            {
                login && <Login setLoginModel={setLoginModel} />
            }
        </div>
    );
}
export default Navbar;