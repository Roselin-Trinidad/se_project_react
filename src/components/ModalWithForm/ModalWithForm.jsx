import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleClose,
  onSubmit,
  isOpen,
  disabled
}) {
  
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close modal__close_item_card"
          onClick={handleClose}
          type="button" />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className={`modal__submit 
            ${disabled ? "modal__submit_disabled" : ""} `} 
            type="submit"
            disabled={disabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
