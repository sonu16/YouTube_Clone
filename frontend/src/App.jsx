import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Pages/Home/Home.jsx';
import VideoPage from './Pages/VideoPage/VideoPage.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import VideoUpload from './Pages/VideoUpload/VideoUpload.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';


function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTab, setSelectedTab] = useState("All");
    const toggleSidebar = (value) => {
        setSidebarOpen(value);
    };
    return (
        <div className="App">
            <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} searchValue={searchValue} setSearchValue={setSearchValue} />
            <Routes>
                <Route path="/" element={<Home sidebarOpen={sidebarOpen}
                    searchValue={searchValue} setSearchValue={setSearchValue}
                    selectedTab={selectedTab} setSelectedTab={setSelectedTab}
                 />} />
                <Route path='/watch/:id' element={<VideoPage />} />
                <Route path='/user/:id' element={<Profile sidebarOpen={sidebarOpen} />} />
                <Route path='/:id/upload' element={<VideoUpload />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    );
}

export default App
