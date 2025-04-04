import "./SideBar.css";
import avatar from "../../images/avatar-logo.svg";

function SideBar() {
  return (
    <section className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </section>
  );
}

export default SideBar;
