import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

// Función para convertir una fecha del formato "DD/MM/YYYY" a "YYYY-MM-DD"
function convertDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`; // Retorna la fecha en formato ISO
}

export default function CalendarComponent() {
  const [eventos, setEventos] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        // Se asume que data es un array de eventos con las propiedades definidas
        const eventosFormateados = data.map(evento => ({
          id: evento.id,
          title: evento.titulo || "Evento sin título",  // Mapea "titulo" a "title"
          start: convertDate(evento.fecha)              // Convierte "fecha" a formato ISO
        }));
        setEventos(eventosFormateados);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener eventos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando eventos...</p>;

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-bold text-center mb-4">Calendario de Eventos</h2>
      <div className="calendar-itself">
        <FullCalendar
          locale="es"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={eventos}
          selectable={false}  // Se deshabilita la creación de eventos
        />
      </div>
    </div>
  );
}

