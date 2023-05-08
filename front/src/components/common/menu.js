import { Link } from 'react-router-dom';
import '../../assets/styles/menu.css'

function MenuComponent() {
    return (
        <div className="menu">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li> <Link to="people">People</Link></li>
                    <li><Link to="planets">Planets</Link></li>
                    <li><Link to="starships">Starships </Link></li>
                </ul>
            </nav>
        </div>
    );
}
export default MenuComponent;