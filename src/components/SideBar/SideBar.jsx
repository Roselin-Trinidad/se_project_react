import "./SideBar.css";
import avatar from "../../images/avatar-logo.svg";

function SideBar() {
  return (
    <section className="sidebar">
      <img className="header__avatar sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="header__username sidebar__username">Terrence Tegegne</p>
    </section>
  );
}

export default SideBar;
