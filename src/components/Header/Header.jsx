import './Header.css'
import logo from '../../images/logo.svg'
import avatar from '../../images/avatar-logo.svg'
function Header({ handleAddClick }) {
    return (
        <header className="header">
            <div className="header__logo-container">
            <img className="header__logo" src={logo} alt='logo'/>
            <p className="header__date-and-location">Date, Location</p>
            </div>
            <div className="header__menu-container">
                <button onClick={handleAddClick} type="button" className="header__add-clothes-button">+ Add Clothes</button>
                <p className="header__username">Terrence Tegegne</p>
                <img className="header__avatar" src={avatar} alt='Terrence Tegegne'/>
            </div>
            
        </header>
    )
}

export default Header;