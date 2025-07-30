import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import './HomePage.css';

const HomePage = ({ sidebarOpen, searchValue, selectedTab, setSelectedTab }) => {

    const [data, setData] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:5000/api/videos/all').then(res => {
            console.log(res.data.videos);
            setData(res.data.videos);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const tabs = ["All", "Animation", "Information", "T20 Cricket", "Music", "Live", "Mixes", "Movies", "Gaming", "Entertainment", "Sports", "Comedy", "Education", "Technology", "Comedy", "Shorts", "Fashion & Beauty", "Learning", "Health & Fitness", "Travel & Events"];
    const tabsRef = useRef(null);

    const scrollTabs = (direction) => {
        if (tabsRef.current) {
            const scrollAmount = 150;
            tabsRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const filteredData = data.filter(item => {
        const tabMatch = selectedTab === "All" || (item?.videoType && item?.videoType === selectedTab);
        const searchMatch = item?.title.toLowerCase().includes(searchValue.toLowerCase());
        return tabMatch && searchMatch;
    });

    return (
        <div className={sidebarOpen ? "home-page" : "home-page-full"}>
            <div className="home-page-tabs-wrapper">
                <button className="tabs-scroll-btn left" onClick={() => scrollTabs("left")}><MdKeyboardArrowLeft /></button>
                <div className="home-page-tabs" ref={tabsRef}>
                    {tabs.map((tab, index) => (
                        <div key={index} className={`home-page-tab${selectedTab === tab ? "selected" : ""}`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <button className="tabs-scroll-btn right" onClick={() => scrollTabs("right")}><MdKeyboardArrowRight /></button>
            </div>
            <div className={sidebarOpen ? "home-page-main" : "home-page-main-full"}>

                    {
                        filteredData.map((item, index) => {
                            return (
                                <Link to={`/watch/${item._id}`} className="video-section">

                                    <div className="video-thumbnail-section">
                                        <img src={item?.thumbnailUrl} alt="Thumbnail" className="video-thumbnail" />
                                        <div className="video-duration">10:00</div>
                                    </div>

                                    <div className="video-user-section">
                                        <div className="video-user-logo">
                                            <img src={item?.uploader?.avatar} alt="User Logo" className="user-logo" />
                                        </div>
                                        <div className="video-metadata">
                                            <div className="video-title">{item?.title}</div>
                                            <div className="video-channel">{item?.uploader?.username}</div>
                                            <div className="video-views">{item?.views} views</div>
                                        </div>
                                    </div>                  
                                </Link>
                            )
                        })
                    }

            </div>            
        </div>
    );
};

export default HomePage;
