import "../footer/footer.css";

const Footer = () => {
    return (
        <footer> 
            <h3>Contacto</h3>
            <ul> 
                <li>Teléfono: +34 622 71 77 11 </li>
                <li>Email: </li>
                <li>Dirección: Discoteca Sala Bless, C/ Calvario, 21, 28901 Getafe, Madrid</li>
            </ul>

            <h3>Síguenos</h3>
                <a href='https://www.tiktok.com/@bless.the.club' target='_blank'><ion-icon name="logo-tiktok" style={{ color: 'white'}}></ion-icon></a>
                <a href='https://www.instagram.com/bless.theclub/' target='_blank'><ion-icon name="logo-instagram" style={{ color: 'white'}}></ion-icon></a>
        </footer>
    );
}

export default Footer;
