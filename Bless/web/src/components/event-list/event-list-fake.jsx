import { useState, useEffect } from "react";
import EventCard from "../../components/event-card/event-card";
import "./event-list.css";
import React from 'react';

function EventListFake({ limit, page }) {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/db.json') // Ruta correcta desde la carpeta public
            .then((response) => response.json()) // Convertir a JSON
            .then((data) => {
                console.log("Datos obtenidos de db.json:", data);
                setEventos(data); // data debe ser un array
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener eventos:", error);
                setLoading(false);
            });
    }, [limit, page, reload]);

    if (loading) return <p>Cargando eventos...</p>;

    const handleEventDeletion = (id) => {
        setEventos((prevEventos) => prevEventos.filter(evento => evento.id !== id));
        setReload(prev => !prev);
    };

    return (
        <div className="event-list">
            {eventos.map((evento, index) => (
                <React.Fragment key={evento.id}>
                    <EventCard evento={evento} onDelete={handleEventDeletion} />
                    {index < eventos.length - 1 && <hr className="event-divider" />}
                </React.Fragment>
            ))}
        </div>
    );
}

export default EventListFake;