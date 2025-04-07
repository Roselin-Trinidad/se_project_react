import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ isOpen, onAddItemModalSubmit, handleClose, buttonText }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();
  
  const submitGarment = (e) => {
    e.preventDefault ();
    onAddItemModalSubmit({ name: values.name, imageUrl: values.imageUrl, weather: values.selectedWeather });
  };

  useEffect(() => {
    resetForm({name:"", imageUrl:"", selectedWeather:""}) 
  }, [isOpen, resetForm])
  
  return (
    <ModalWithForm
      title="New garment"
      buttonText={buttonText}
      handleClose={handleClose}
      onSubmit={submitGarment}
      isOpen={isOpen}
      disabled={!isValid}

    >
      <label htmlFor="name" className="modal__label">
        Name
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
      <label htmlFor="imageUrl" id="imageUrl" className="modal__label">
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          id="imageUrl"
          placeholder="Image Url"
          onChange={handleChange}
          value={values.imageUrl || ""}
          required
        />
        {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__input_type_radio ${
            values.selectedWeather === "hot" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            name="selectedWeather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            checked={values.selectedWeather === "hot"}
            onChange={handleChange}
            value="hot"
          />
          Hot
        </label>
        
        <label
          htmlFor="warm"
          className={`modal__label modal__input_type_radio ${
            values.selectedWeather === "warm" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            name="selectedWeather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            checked={values.selectedWeather === "warm"}
            onChange={handleChange}
            value="warm"
          />
          Warm
        </label>
        
        <label
          htmlFor="cold"
          className={`modal__label modal__input_type_radio ${
            values.selectedWeather === "cold" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            name="selectedWeather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            checked={values.selectedWeather === "cold"}
            onChange={handleChange}
            value="cold"
          />
          Cold
        </label>
      </fieldset>
      {errors.selectedWeather && <span className="modal__error">{errors.selectedWeather}</span>}
    </ModalWithForm>
  );
}

export default AddItemModal;
