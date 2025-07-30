import React from "react";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { PiScissors } from "react-icons/pi";
import './Sidebar.css';

const Sidebar = ({ sidebarOpen }) => {
    return (
        <div className={sidebarOpen ? "home-sidebar" : "home-sidebar-hidden"}>
            <div className="home-sidebar-top">
                <div className="home-sidebar-top-icon">
                    <IoMdHome size={25} />
                    <div className="home-sidebar-top-title">Home</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <SiYoutubeshorts size={22} color="white" style={{ stroke: "black", strokeWidth: 2 }} />
                    <div className="home-sidebar-top-title">Shorts</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <MdOutlineSubscriptions size={22} />
                    <div className="home-sidebar-top-title">Subscriptions</div>
                </div>
            </div><hr color="#f0f0f0"></hr>

            <div className="home-sidebar-middle">
                <div className="home-sidebar-top-icon">
                    You
                    <div className="home-sidebar-top-title">
                        <IoIosArrowForward size={20} />
                    </div>
                </div>
                <div className="home-sidebar-top-icon">
                    <MdOutlineVideoCameraFront size={22} />
                    <div className="home-sidebar-top-title">Your channel</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <MdHistory size={22} />
                    <div className="home-sidebar-top-title">History</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <MdOutlinePlaylistPlay size={22} />
                    <div className="home-sidebar-top-title">Playlists</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <CiYoutube size={22} />
                    <div className="home-sidebar-top-title">Your videos</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <MdOutlineWatchLater size={22} />
                    <div className="home-sidebar-top-title">Watch later</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <AiOutlineLike size={22} />
                    <div className="home-sidebar-top-title">Liked videos</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <PiScissors size={22} />
                    <div className="home-sidebar-top-title">Your clips</div>
                </div>
            </div><hr color="#f0f0f0"></hr>

            <div className="home-sidebar-middle">
                <div className="home-sidebar-top-icon">
                    <div className="home-sidebar-top-title">
                        <h3>Subscriptions</h3>
                    </div>
                </div>
                <div className="home-sidebar-top-icon">
                    <img className="home-sidebar-channel-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUUHTv7qB78gCE494G6dG88Wyw_zbKR6etg&s" />
                    <div className="home-sidebar-top-title">INDIA TV</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <img className="home-sidebar-channel-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPlzbgx4GwXzoH_SChc8CJfidCew4jjsN1w&s" />
                    <div className="home-sidebar-top-title">SONY</div>
                </div>
                <div className="home-sidebar-top-icon">
                    <img className="home-sidebar-channel-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS61od-nPbLMT8NJ36pQ1bLSzeWbW3j0w_qjw&s" />
                    <div className="home-sidebar-top-title">LALLANTOP</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;