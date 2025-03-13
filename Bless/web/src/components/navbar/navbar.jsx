import { Link } from "react-router-dom"; 
import "./navbar.css"
import { useAuthContext } from "../../contexts/auth-context";

const Navbar = () => {
    
    const { user } = useAuthContext();

    return (
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://res.cloudinary.com/dbfdph0aj/image/upload/c_crop,w_380,h_280/v1741635136/Blees_Logo_rjakyh.png" 
              alt="Logo"
              width="110"
              height="40"
              className="logo"
            />
          </Link>
  
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/eventos-privados">
                  Eventos privados
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/album">
                  Album
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="https://www.fourvenues.com/en/bless-the-club-1">
                  Entradas
                </Link>
              </li>
              
            </ul>
          </div>
          <div className = "login-icon">
          <Link to="/login">
          <ion-icon
            name="person-circle-outline"
            className={user ? 'logged-in' : ''}
          ></ion-icon>
          </Link>
          </div>
        </div>
      </nav>
    
    );
  };
  
export default Navbar;
  