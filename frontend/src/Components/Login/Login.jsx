import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css'

function Login({ setLoginModel }) {
    const [loginFields, setLoginFields] = useState({ 'email': "", 'password': "" });
    const [progressBar, setProgressBar] = useState(false);

    const handleLoginInput = (event, name) => {
        setLoginFields({
            ...loginFields, [name]: event.target.value
        })
    }

    const handleLogin = async () => {
        setProgressBar(true);
        axios.post('http://localhost:5000/api/users/login', loginFields, { withCredentials: true }).then((res) => {
            setProgressBar(false);
            console.log(res);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('userAvatar', res.data.user.avatar);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            toast.error("Invalid Credentials");
            setProgressBar(false);
        })
    }
    return (
        <div className='login'>
            <div className="login-card">
                <div className="login-card-header">
                    <BsYoutube size={30} style={{ color: "red" }} />
                    <div className="login-header-text">Login</div>
                </div>

                <div className="login-credentials">
                    <div className="user-login-section">
                        <input type="text" value={loginFields.email} onChange={(e) => { handleLoginInput(e, 'email') }} className="user-login-username" placeholder="email" />
                    </div>
                    <div className="user-login-section">
                        <input type="password" value={loginFields.password} onChange={(e) => { handleLoginInput(e, 'password') }} className="user-login-username" placeholder="Password" />
                    </div>
                </div>

                <div className="login-btns">
                    <div className="login-button" onClick={handleLogin}>Login</div>
                    <Link to={'/signup'} className="login-button" onClick={() => setLoginModel()}>SignUp</Link>
                    <div className="login-button" onClick={() => setLoginModel()}>Cancel</div>
                </div>

                {progressBar && <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;