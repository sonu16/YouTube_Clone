import { BsYoutube } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const [uploadedImageURL, setUploadedImageURL] = useState("https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg");
    const [signUpFields, setSignUpFields] = useState({ 'username': "", 'email': "", 'password': "", 'avatar': "" });
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();

    const handleSignUpInput = (event, name) => {
        setSignUpFields({
            ...signUpFields, [name]: event.target.value
        })
    }

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dzr9pf9tz/image/upload", data);
            setProgressBar(false);
            const imageURL = response.data.url;
            setUploadedImageURL(imageURL);
            setSignUpFields({
                ...signUpFields, "avatar": imageURL
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUp = async () => {
        setProgressBar(true);
        await axios.post('http://localhost:5000/api/users/register', signUpFields).then((res) => {
            console.log(res);
            toast.success(res.data.message);
            setProgressBar(false);
            navigate('/');
        }).catch((err) => {
            setProgressBar(false);
            toast.error(err);
        })
    }

    return (
        <div className='signUp'>
            <div className="signUp-card">
                <div className="signUp-card-header">
                    <BsYoutube size={30} style={{ color: "red" }} />
                    <div className="signUp-header-text">Sign Up</div>
                </div>

                <div className="signUp-inputs">
                    <input type="text" value={signUpFields.username} onChange={(e) => { handleSignUpInput(e, 'username') }} className="signUp-inputs-input" placeholder="username" />
                    <input type="text" value={signUpFields.email} onChange={(e) => { handleSignUpInput(e, 'email') }} className="signUp-inputs-input" placeholder="e-mail" />
                    <input type="password" value={signUpFields.password} onChange={(e) => { handleSignUpInput(e, 'password') }} className="signUp-inputs-input" placeholder="password" />

                    <div className="upload-signup-image">
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        <div className="image-container">
                            <img className='default-signup-image' src={uploadedImageURL} alt="" />
                        </div>
                    </div>

                    <div className="signup-btns">
                        <div className="signup-button" onClick={handleSignUp}>Sign Up</div>
                        <Link to={'/'} className="signup-button">Home</Link>
                    </div>

                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp;