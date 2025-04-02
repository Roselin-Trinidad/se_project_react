import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
function AddItemModal({ isOpen, onAddItemModalSubmit, handleClose }) {
  const [selectedWeather, setSelectedWeather] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  
  const handleWeatherSelect = (e) => {
    setSelectedWeather(e.target.value);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleImageURLChange = (e) => {
    setLink(e.target.value);
  }

  const submitGarment = (e) => {
    e.preventDefault ();
    onAddItemModalSubmit({ name, link, selectedWeather});
    setName("");
    setLink("");
    setSelectedWeather(""); 
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      handleClose={handleClose}
      onSubmit={submitGarment}
      onChange={handleWeatherSelect}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="link" id="link" className="modal__label">
        Image
        <input
          type="url"
          id="link"
          className="modal__input"
          placeholder="Image Url"
          onChange={handleImageURLChange}
          value={link}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__input_type_radio ${
            selectedWeather === "hot" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            id="hot"
            type="radio"
            name="modal__radio-input"
            checked={selectedWeather === "hot"}
            onChange={handleWeatherSelect}
            value="hot"
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className={`modal__label modal__input_type_radio ${
            selectedWeather === "warm" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            id="warm"
            type="radio"
            name="modal__radio-input"
            checked={selectedWeather === "warm"}
            onChange={handleWeatherSelect}
            value="warm"
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className={`modal__label modal__input_type_radio ${
            selectedWeather === "cold" && "modal__input_type_radio_checked"
          }`}
        >
          <input
            id="cold"
            type="radio"
            name="modal__radio-input"
            checked={selectedWeather === "cold"}
            onChange={handleWeatherSelect}
            value="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
