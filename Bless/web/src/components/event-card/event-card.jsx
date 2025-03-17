import "./event-card.css"
import { Link } from "react-router-dom"

function EventCard ( { evento }) {
    function formatDate(fecha) {
        const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        const [dia, mes, año] = fecha.split("/");
        return { dia, mes: meses[parseInt(mes) - 1], año };
    }

    const { dia, mes, año } = formatDate(evento.fecha);
    return (
        <div className="event-card">
            
            <div className="imagen">
            
            <img 
                src={evento.cartel} 
                alt={evento.titulo} 
            />
            </div>
            <div className = "titulos">
            <h2>{evento.titulo} </h2>
            <h3> Bless The Club</h3>
            </div>
            <div className="fecha">
                <span className="dia">{dia}</span>
                <span className="mes">{mes}</span>
                <span className="año">{año}</span>
            </div>
            <div className="botones">
            <a href="https://www.fourvenues.com/en/bless-the-club-1" 
                className="btn btn-dark btn-lg">
                Entradas
            </a>
            </div>
            
        </div>
    ); 
}; 

export default EventCard; 