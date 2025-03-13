
import Carousel from "../components/carousel/carousel";
import EventList from "../components/event-list/event-list";
import FiestaPrivInfo from "../components/fiesta-privada-info/fiesta-priv-info";
import Footer from "../components/footer/footer";
import Map from "../components/map/map";
import MovingText from "../components/moving-text/moving-text";
import "../pages/home.css";

const Home = () => {
    return (
        <div>
            <div className = "carousel">
                <Carousel/>
            </div> 
            <div className = "moving-text"> 
                <MovingText/>
            </div>
            <div className="event-card"> 
                <EventList/> 
            </div>
            <div className= "private-events">
                <FiestaPrivInfo/>
            </div>
            <div className="map">
                <Map/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
