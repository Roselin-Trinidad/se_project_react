import "./DeleteModal.css";

function DeleteModal({ 
  isOpen, 
  handleClose, 
  onDelete, 
  card, 
  buttonText, 
  isLoggedIn,
  handleRegistration,
  handleLogIn
 }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
      <button
          onClick={handleClose}
          className="modal__close modal__close_type_delete"
          type="button"
        />
        {isLoggedIn ? 
        (<div className="delete__logged-in-container">
          <p className="modal__warning">
            Are you sure you want to delete this item? <br />
            This action is irreversible.
          </p>
          <div className="modal__delete-buttons-container">
          <button className="modal__delete-button" 
          type="button" onClick={() => onDelete(card._id)}>
              {buttonText}
          </button>
          <button onClick={handleClose} 
              className="modal__cancel-button" 
              type="button">
              Cancel
          </button>
          </div>
        </div>) :
        ( <div className="delete__sign-up-container">
            <p className="modal__warning">
              Sorry. This feature is for users only. <br />
            </p>
            <div className="modal__sign-up-buttons-container">
            <button onClick={handleRegistration}
              className="modal__sign-up-button" type="button">
              Sign Up
            </button>
            <button onClick={handleLogIn}
              className="modal__log-in-button" type="button">
              Log In
            </button>
            </div>
          </div>
        )
        }
        
      </div>
    </div>
  );
}

export default DeleteModal;
