import Sidebar from "../../Components/Sidebar/Sidebar";
import HomePage from "../../Components/HomePage/HomePage";
import './Home.css';
const Home = ({ 
    sidebarOpen,
    searchValue,
    setSearchValue,
    selectedTab,
    setSelectedTab
 }) => {
    return (
        <div className="home">
            <Sidebar sidebarOpen={sidebarOpen} />
            <HomePage sidebarOpen={sidebarOpen} searchValue={searchValue}
                selectedTab={selectedTab} setSelectedTab={setSelectedTab}
             />
        </div>
    );
};

export default Home;