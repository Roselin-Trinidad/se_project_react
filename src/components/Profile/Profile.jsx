import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, isOpen, clothingItems }) {
  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar />
        <ClothesSection 
          onCardClick={onCardClick} 
          isOpen={isOpen} 
          clothingItems={clothingItems}/>
      </div>
    </div>
  );
}

export default Profile;
