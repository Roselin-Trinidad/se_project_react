import './ModalWithForm.css';

function ModalWithForm({ children, buttonText, title, activeModal, handleClose, onSubmit}) {
    return (
        <div className={`modal ${activeModal === "add-garment" && "modal_opened" }`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <button className="modal__close" onClick={handleClose} type="button"></button>
                <form className="modal__form"> 
                    {children}
                    <button onClick={onSubmit} className="modal__submit" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;
