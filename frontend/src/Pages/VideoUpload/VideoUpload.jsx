import { BsYoutube } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './VideoUpload.css'

function VideoUpload() {
    const [channelInputs, setChannelInputs] = useState({ 'channelName': "", 'description': "", 'channelBanner': "" });
    const [inputFields, setInputFields] = useState({ 'title': "", 'description': "", 'videoType': "", 'thumbnailUrl': "", 'videoUrl': "" });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleChannelInput = (eve, nam) => {
        setChannelInputs({
            ...channelInputs, [nam]: eve.target.value
        })
    }

    const handleSignUpInput = (event, name) => {
        setInputFields({
            ...inputFields, [name]: event.target.value
        })
    }

    const uploadBanner = async (e) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            const resp = await axios.post("https://api.cloudinary.com/v1_1/dzr9pf9tz/image/upload", data);
            const imageUrl = resp.data.url;
            setLoader(false);
            setChannelInputs({
                ...channelInputs, 'channelBanner': imageUrl
            })
        } catch(err) {
            setLoader(false);
            console.log(err);
        }
    }

    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dzr9pf9tz/${type}/upload`, data);
            const url = response.data.url;
            setLoader(false);
            let result = type === 'image' ? 'thumbnailUrl' : 'videoUrl';
            setInputFields({
                ...inputFields, [result]: url
            })

        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    useEffect(() => {
        let isLogin = localStorage.getItem('userId');
        if (isLogin === null) {
            navigate('/');
        }
    }, [])

    const handleCreateChannel = async () => {
        setLoader(true);
        await axios.post('http://localhost:5000/api/channel/create', channelInputs, { withCredentials: true } ).then(res => {
            console.log(res);
            setLoader(false);
        }).catch(err => {
            console.log(err);
            setLoader(false);
        })
    }

    const handleUploadFunction = async () => {
        setLoader(true);
        await axios.post('http://localhost:5000/api/videos/upload', inputFields, { withCredentials: true }).then((res) => {
            console.log(res);
            setLoader(false);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setLoader(false);
        })
    }

    return (
        <div className='video-upload'>
            <div className="video-upload-container">
                <div className="container-header-logo">
                    < BsYoutube size={25} style={{ color: "red" }} />
                    <div className="container-header-title">Create Channel</div>
                </div>

                <div className="video-upload-form">
                    <input type="text" value={channelInputs.channelName} onChange={(e) => { handleChannelInput(e, 'channelName') }} placeholder="Channel Name" className="upload-form-input" />
                    <input type="text" value={channelInputs.description} onChange={(e) => { handleChannelInput(e, 'description') }} placeholder="Description" className="upload-form-input" />
                    <div className="uploader">Banner <input type="file" accept="image/*" onChange={(e) => uploadBanner(e, 'channelBanner')} /> </div>
                </div>

                <div className="upload-btns">
                    <div className="create-channel-btn" onClick={handleCreateChannel}>Create</div>
                </div>

            
                <div className="container-header-logo">
                    < BsYoutube size={25} style={{ color: "red" }} />
                    <div className="container-header-title">Upload Video</div>
                </div>
           
                <div className="video-upload-form">
                    <input type="text" value={inputFields.title} onChange={(e) => { handleSignUpInput(e, 'title') }} placeholder="Title of the video" className="upload-form-input" />
                    <input type="text" value={inputFields.description} onChange={(e) => { handleSignUpInput(e, 'description') }} placeholder="Description" className="upload-form-input" />
                    <input type="text" value={inputFields.category} onChange={(e) => { handleSignUpInput(e, 'videoType') }} placeholder="Category" className="upload-form-input" />
                    <div className="uploader">Thumbnail <input type="file" accept="image/*" onChange={(e) => uploadImage(e, 'image')} /> </div>
                    <div className="uploader">Video <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, 'video')} /></div>

                    {
                    loader && <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                    }
                </div>

                

                <div className="upload-btns">
                    <div className="form-upload-btn" onClick={handleUploadFunction}>Upload</div>
                    <Link to={'/'} className="form-upload-btn">Home</Link>
                </div>

            </div>
        </div>
    );
}

export default VideoUpload;