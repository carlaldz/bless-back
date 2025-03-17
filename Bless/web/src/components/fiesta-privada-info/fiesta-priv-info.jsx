import "./fiesta-priv-info.css";

const FiestaPrivInfo = () => {
  return (
    <div className="fiesta-priv">
      <h2>Organiza tu fiesta</h2>
      <h4>Tenemos el espacio que necesitas para tu ocasión</h4>

      <div className="bubbles">
        <div className="party-type">
          <h3><ion-icon name="balloon-outline"></ion-icon> Cumpleaños</h3>
          <p>¡Haz de tu cumpleaños una experiencia única! Trae tu propia comida y decoración y déjanos encargarnos de la parte más divertida: música, ambiente y todo lo necesario para que tú y tus invitados paséis una noche increíble.</p>
        </div>

        <div className="party-type">
          <h3><ion-icon name="school-outline"></ion-icon> Graduaciones</h3>
          <p>Tu graduación merece ser celebrada a lo grande. Ya sea de la ESO, Bachillerato o Universidad, ofrecemos un ambiente lleno de energía, perfecto para marcar el final de una etapa y empezar con fuerza la siguiente. Vive este momento con la mejor música.</p>
        </div>

        <div className="party-type">
          <h3><ion-icon name="briefcase-outline"></ion-icon> Eventos de Empresa</h3>
          <p>Ofrecemos el espacio ideal para tu evento de empresa, con horarios flexibles y una atmósfera que puede ser tanto formal como relajada, según lo que necesites. Ya sea para una reunión importante o para una fiesta de equipo, estamos listos para hacerlo posible.</p>
        </div>

        <div className="party-type">
          <h3><ion-icon name="musical-notes-outline"></ion-icon> Conciertos</h3>
          <p>Si lo tuyo es la música en vivo, nuestra discoteca es el lugar perfecto para tu próximo concierto. Contamos con un espacio adaptado y la mejor calidad de sonido, para que tu evento sea todo un éxito, ya sea un concierto íntimo o un gran show.</p>
        </div>

        <div className="party-type">
          <h3><ion-icon name="beer-outline"></ion-icon> Fiestas Universitarias</h3>
          <p>La fiesta universitaria perfecta te está esperando. Con música vibrante y una atmósfera llena de energía, podrás disfrutar de una noche con tus amigos como nunca antes. Ven a celebrar lo mejor de la vida universitaria con nosotros, ¡te aseguramos una noche inolvidable!</p>
        </div>
      </div>
    </div>
  );
};

export default FiestaPrivInfo;
