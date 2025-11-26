import { useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegistrationModal({ 
  isOpen, 
  handleClose, 
  buttonText, 
  handleRegistration,
  handleSwitchingModal,
  buttonSwitchingText
 }) {

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  const submitRegisterForm = (e) => {
  e.preventDefault();
  handleRegistration({ 
      email: values.email, 
      password: values.password, 
      name: values.name, 
      avatarURL: values.avatarUrl })
  }
  
  useEffect(() => {
  resetForm({ email:"", password:"", name:"", avatarUrl:""})
  }, [isOpen, resetForm])

return (
  <ModalWithForm
    title="Sign up"
    buttonText={buttonText}
    handleClose={handleClose}
    onSubmit={submitRegisterForm}
    isOpen={isOpen}
    disable={!isValid}
    buttonSwitchingText={buttonSwitchingText}
    handleSwitchingModal={handleSwitchingModal}
  >
        <label htmlFor="email" className="modal__label">
          Email*
          <input 
            type="email"
            name="email"
            id="email"
            className="modal__input"
            placeholder="Email"
            minLength="1" 
            maxLength="30"
            onChange={handleChange}
            value={values.email || ""}
            required
            
          />
          {errors.email && <span className="modal__error">{errors.email}</span>} 
        </label>
        <label htmlFor="password" className="modal__label">
          Password*
          <input 
            type="password"
            name="password"
            id="password"
            className="modal__input"
            placeholder="Password"
            minLength="1" 
            maxLength="30"
            onChange={handleChange}
            value={values.password || ""}
            required
            />
          {errors.password && <span className="modal__error">{errors.password}</span>} 
        </label>
         <label htmlFor="name" className="modal__label">
          Name*
          <input 
            type="text"
            name="name"
            id="name"
            className="modal__input"
            placeholder="Name"
            minLength="1" 
            maxLength="30"
            onChange={handleChange}
            value={values.name || ""}
            required
          />
          {errors.name && <span className="modal__error">{errors.name}</span>} 
        </label>
        <label htmlFor="avatarUrl" className="modal__label">
          Avatar*
          <input 
            type="url"
            name="avatarUrl"
            id="avatarUrl"
            className="modal__input"
            placeholder="Avatar Url"
            onChange={handleChange}
            value={values.avatarUrl || ""}
            required
            
          />
          {errors.avatarUrl && <span className="modal__error">{errors.avatarUrl}</span>} 
        </label>
  </ModalWithForm>

)
}

export default RegistrationModal