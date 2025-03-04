import { Link } from "react-router-dom"; 
import "./navbar.css"

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/logo.svg" 
              alt="Logo"
              width="100"
              height="40"
              className="d-inline-block align-text-top"
            />
          </Link>
  
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pokedex">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Eventos privados
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deck">
                  Album
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deck">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deck">
                  Entradas
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  