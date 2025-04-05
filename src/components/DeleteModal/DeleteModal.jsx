import "./DeleteModal.css";

function DeleteModal({ isOpen, handleClose, onDelete, card}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
      <button
          onClick={handleClose}
          className="modal__close modal__close_type_delete"
          type="button"
        />
        <p className="modal__warning">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>
        <button className="modal__delete-button" type="button" onClick={() => onDelete(card._id)}>
            Yes, delete item
        </button>
        <button onClick={handleClose} 
            className="modal__cancel-button" 
            type="button">
            Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
