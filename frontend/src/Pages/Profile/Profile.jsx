import Sidebar from '../../Components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'


const Profile = ({ sidebarOpen }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [channelData, setChannelData] = useState(null);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        await axios.get(`http://localhost:5000/api/videos/uploader/${id}`).then(res => {
            console.log(res.data);
            setData(res.data.videos);
            setUser(res.data.videos[0]?.uploader);
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchChannelData = async () => {
        await axios.get(`http://localhost:5000/api/channel/owner/${id}`).then(resp => {
            console.log(resp);
            setChannelData(resp.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchProfileData();
        fetchChannelData();
    }, [id])

    return (
        <div className="profile">
            <Sidebar sidebarOpen={sidebarOpen} />

            <div className={sidebarOpen ? "profile-page" : "profile-page-full"}>
                <div className="channel-banner">
                    <img className="channel-banner-img" src={channelData?.channelBanner} alt="" />
                </div>

                <div className="profile-top-section">
                    <div className="top-section-profile">
                        <img className='top-profile-img' src={user?.avatar} />
                    </div>
                    <div className="about-profile">
                        <div className="about-profile-name">{channelData?.channelName}</div>
                        <div className="about-profile-info">
                            {user?.username}  <span className='channel-info'>. {data.length} videos</span>
                        </div>
                        <div className="channel-info">
                            {channelData?.description}
                        </div>
                    </div>
                </div>

                <div className="profile-videos-section">
                    <div className="profile-videos-header">Videos</div>
                    <div className="profile-videos">
                        {
                            data.map((item, index) => {
                                return (
                                    <Link to={`/watch/${item?._id}`} className="videos-section">
                                        <div className="videos-section-thumbnail">
                                            <img className='videos-section-thumbnail-img' src={item?.thumbnailUrl} alt='' />
                                        </div>
                                        <div className="videos-detail-section">
                                            <div className="video-title">{item?.title}</div>
                                            <div className="video-detail">{item?.views} views . created at {item?.uploadDate.slice(0, 10)}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Profile;
