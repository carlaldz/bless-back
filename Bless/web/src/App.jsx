import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/navbar/navbar'
import WhatsappButton from './components/whatsapp-button/whatsapp-button'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./App.css"
import Login from './pages/login';
import { AuthProvider } from './contexts/auth-context';
import Calendario from './pages/calendario';
import Album from "./pages/album"

function App() {
  return (
    <Router>
    <AuthProvider>
    <Navbar/> 
    <WhatsappButton/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/calendario" element={<Calendario/>} />
    <Route path="/album" element={<Album/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
  </AuthProvider>
  </Router>
  )
}

export default App