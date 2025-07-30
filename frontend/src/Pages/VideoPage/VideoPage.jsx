import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiOutlineHandThumbDown } from "react-icons/hi2";
import './VideoPage.css';

const Video = () => {

    const [text, setText] = useState("");
    const [data, setData] = useState(null);
    const [suggested, setSuggested] = useState(null);
    const [videoLink, setVideoLink] = useState("");
    const [allComment, setAllComment] = useState([]);
    const { id } = useParams();

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:5000/api/videos/${id}`).then(res => {
            console.log(res.data);
            setData(res.data.video);
            setVideoLink(res?.data?.video?.videoUrl);
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchCommentByVideoId = async () => {
        await axios.get(`http://localhost:5000/api/comments/comment/${id}`).then(response => {
            console.log(response.data);
            setAllComment(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    
    useEffect(() => {
        fetchVideoById();
        fetchCommentByVideoId();
    }, [id])

    const handleComment = async () => {
        const body = {
            "video": id,
            "text": text
        }
        await axios.post('http://localhost:5000/api/comments/addComment', body, { withCredentials: true }).then((res) => {
            console.log(res);
            const newComment = res.data.text;
            setAllComment([newComment, ...allComment]);
        }).catch((err) => {
            toast.error("Please login first to comment");
        })
    }

    return (
        <div className="video">
            <div className="video-section">
                <div className="video-player">
                    {data && <video width="400" controls autoPlay className="video-player-element">
                        <source src={videoLink} type="video/mp4" />
                        <source src={videoLink} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>}
                </div>

                <div className="video-details">
                    <div className="video-title">{data?.title}</div>
                    <div className="video-user-section">
                        <div className="user-section-left">
                            <Link to={`/user/${data?.uploader?._id}`} className="user-image-left">
                                <img src={data?.uploader?.avatar} alt="User Logo" className="user-logo" />
                            </Link>
                            <div className="video-subsViews">
                                <div className="video-user-name">{data?.uploader?.username}</div>
                                <div className="video-creation-date">{data?.uploader?.createdAt ? data?.uploader?.createdAt.slice(0, 10) : null}</div>
                            </div>
                            <div className="subscribe-btn">Subscribe</div>
                        </div>

                        <div className="user-section-right">
                            <div className="video-like-section">
                                <HiOutlineHandThumbUp size={20} />
                                <div className="like-count">{data?.likes}</div>
                            </div>
                            <div className="divider-div"></div>
                            <div className="video-dislike-section">
                                <HiOutlineHandThumbDown size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="video-description">
                        <div>{data?.views} views {data?.uploadDate ? data?.uploadDate.slice(0, 10) : ""}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <div className="video-comments-section">
                    <div className="comments-section-head">{allComment.length} Comments</div>

                    <div className="video-self-comment">
                        <img className="self-profile-logo" src={data?.uploader?.avatar} />
                        <div className="add-comment">
                            <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} className="add-comment-input" placeholder="Add a comment..." />
                            <div className="cancel-submit-comment">
                                <div className="comment">Cancel</div>
                                <div className="comment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className="video-others-comment">
                        {
                            allComment.map((item) => {
                                return (
                                    <div className="video-self-comment" key={item._id} >
                                        <img className="self-profile-logo" src={item?.author?.avatar} />
                                        <div className="others-comment-section">
                                            <div className="others-comment-header">
                                                <div className="others-username">{item?.author?.username}</div>
                                                <div className="comment-timing">{item?.createdAt ? item?.createdAt.slice(0, 10) : null}</div>
                                            </div>

                                            <div className="other-user-comments">
                                                {item?.text}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>


                </div>
            </div>
            {/*************************Div for video suggestions********************************************************************************/}
            <div className="video-suggestions">

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9WeikdcjYSuaBbKe7usxKQj5S5h3ModHDQ&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">10 Ways to Grow Business</div>
                        <div className="video_suggetions_about_profile">Biz_pro</div>
                        <div className="video_suggetions_about_profile">136K views . 11 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbh-kuPRyYrMEmaQeQb-lMHCZOs5j3m1o5jA&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">My Reaction Video</div>
                        <div className="video_suggetions_about_profile">mr_reaction</div>
                        <div className="video_suggetions_about_profile">86K views . 5 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTxVYbzmByHw18ZVFr2gICWQOhNYvp3BtnA&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">Fitness training at home</div>
                        <div className="video_suggetions_about_profile">beFit</div>
                        <div className="video_suggetions_about_profile">101K views . 9 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgObY6c5_KjsX8XeaEV_dYNs9KgtjC5pfbBw&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">Videogames for beginners</div>
                        <div className="video_suggetions_about_profile">gamerz</div>
                        <div className="video_suggetions_about_profile">91K views . 18 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9WeikdcjYSuaBbKe7usxKQj5S5h3ModHDQ&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">10 Ways to Grow Business</div>
                        <div className="video_suggetions_about_profile">Biz_pro</div>
                        <div className="video_suggetions_about_profile">136K views . 11 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbh-kuPRyYrMEmaQeQb-lMHCZOs5j3m1o5jA&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">My Reaction Video</div>
                        <div className="video_suggetions_about_profile">mr_reaction</div>
                        <div className="video_suggetions_about_profile">86K views . 5 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTxVYbzmByHw18ZVFr2gICWQOhNYvp3BtnA&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">Fitness training at home</div>
                        <div className="video_suggetions_about_profile">beFit</div>
                        <div className="video_suggetions_about_profile">101K views . 9 day ago</div>
                    </div>
                </div>

                <div className="video-suggestions-section">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgObY6c5_KjsX8XeaEV_dYNs9KgtjC5pfbBw&s" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_about">
                        <div className="video_suggetions_about_title">Videogames for beginners</div>
                        <div className="video_suggetions_about_profile">gamerz</div>
                        <div className="video_suggetions_about_profile">91K views . 18 day ago</div>
                    </div>
                </div>

            </div>
            <ToastContainer />

        </div>
    );
};

export default Video;
