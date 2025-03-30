import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/" className="header__link"> 
          <img className="header__logo" src={logo} alt="logo" /> 
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__menu-container">
        <ToggleSwitch/>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__username">Terrence Tegegne</p>
        </Link>
          <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
