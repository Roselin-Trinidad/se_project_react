import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constant";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, handleAddClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
