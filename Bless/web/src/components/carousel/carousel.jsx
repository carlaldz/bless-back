import "./carousel.css";

const carousel = () => {
    return (
        <div id="carouselExampleRide" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741863957/Untitled_1.110.1_xy8lgi_m7jymz.png" className="d-block w-100" alt="Fotos de fiesta"/>
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741864040/Untitled_1.82.1_rt99f6_Sharpened_gjslp7.png" className="d-block w-100" alt="Fotos de fiesta"/>
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741863956/Untitled_1.104.1_qotich_nic78z.png" className="d-block w-100" alt="fotos de fiesta"/>
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741863956/Untitled_1.101.1_d0ja4j_hdt00g.png" className="d-block w-100" alt="fotos de fiesta"/>
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741863955/Untitled_1.87.1_ko33ke_tins8a.png" className="d-block w-100" alt="fotos de fiesta"/>
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741863955/Untitled_1.78.1_hxstlc_zr17wu.png" className="d-block w-100" alt="fotos de fiesta"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-overlay">
                <img src="https://res.cloudinary.com/dbfdph0aj/image/upload/v1741902700/Blees_Logo_sin_fondo_tx5crz.png" alt="Bless-logo" className="overlay-img"/>
            </div>
        </div>
        
    );
};

export default carousel;
