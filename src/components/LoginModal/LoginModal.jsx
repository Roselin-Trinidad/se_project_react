import { useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LogInModal({ 
  isOpen, 
  handlelogin, 
  handleClose, 
  buttonText, 
  handleSwitchingModal,
  buttonSwitchingText
}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();
  
  const submitLogin = (e) => {
    e.preventDefault();
    handlelogin({ email: values.email, password: values.password });
  };

  useEffect(() => {
    resetForm({email:"", password:""}) 
  }, [isOpen, resetForm])
  
  return (
    <ModalWithForm
      title="Log in"
      buttonText={buttonText}
      handleClose={handleClose}
      onSubmit={submitLogin}
      isOpen={isOpen}
      disabled={!isValid}
      buttonSwitchingText={buttonSwitchingText}
      handleSwitchingModal={handleSwitchingModal}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>
     
    </ModalWithForm>
  
  );
}

export default LogInModal;