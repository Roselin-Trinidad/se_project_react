import "./ItemModal.css";

function ItemModal({ isOpen, handleClose, card }) {
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
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__image-info">
          <h2 className="modal__image-name">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
