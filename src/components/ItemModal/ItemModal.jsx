import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, handleClose, card, onDelete }) {
  useModalClose(isOpen, handleClose);
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={handleClose}
          className="modal__close modal__close_type_preview"
          type="button"
        />
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__image-info-container">
          <button onClick={() => onDelete(card._id)} 
          className="modal__delete-button" 
          type="button">Delete item</button>
          <div className="modal__image-info">
            <h2 className="modal__image-name">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
