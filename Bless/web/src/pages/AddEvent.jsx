import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import * as BlessApi from "/web/src/services/api-service.js";

function AddEvent({ addEvent }) {  
    const [titulo, setTitulo] = useState(""); 
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState(""); 
    const [cartelUrl, setCartelUrl] = useState(""); 
    const [fecha, setFecha] = useState(""); 
    const [horario, setHorario] = useState(""); 
    const [dressCode, setDressCode] = useState(""); 
    const [DJ, setDJ] = useState(""); 
    const [musica, setMusica] = useState("");

    const navigate = useNavigate(); 

    const handleFileUpload = (e) => {
        const uploadData = new FormData(); 
        uploadData.append("cartelUrl", e.target.files[0]); 

        BlessApi
            .uploadImage(uploadData)
            .then(response => {
                setCartelUrl(response.fileUrl); 
            })
            .catch(err => console.log("Error al subir el archivo: ", err)); 
    }; 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const newEvent = { titulo, descripcion, edad: parseInt(edad, 10), cartelUrl, fecha, horario, dressCode, DJ, musica };

        service.createEvent(newEvent)
            .then(res => {
                
                setTitulo(""); 
                setDescripcion(""); 
                setEdad(""); 
                setCartelUrl(""); 
                setFecha(""); 
                setHorario(""); 
                setDressCode(""); 
                setDJ(""); 
                setMusica(""); 

                addEvent(res.data);  

                navigate("/"); 
            })
            .catch(err => console.log("Error al añadir el nuevo evento: ", err));
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required></textarea>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" min="0" required />
            <input type="file" onChange={handleFileUpload} />
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="Horario" required />
            <input type="text" value={dressCode} onChange={(e) => setDressCode(e.target.value)} placeholder="Dress Code" />
            <input type="text" value={DJ} onChange={(e) => setDJ(e.target.value)} placeholder="DJ" />
            <input type="text" value={musica} onChange={(e) => setMusica(e.target.value)} placeholder="Tipo de música" />
            <button type="submit">Añadir Evento</button>
        </form>
    );
}

export default AddEvent;


