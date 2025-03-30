import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddClick }) {
  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar />
        <ClothesSection handleAddClick={handleAddClick}/>
      </div>
    </div>
  );
}

export default Profile;
