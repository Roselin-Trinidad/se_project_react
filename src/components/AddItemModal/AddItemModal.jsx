import { useState } from "react";
import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItemModalSubmit, handleClose }) {
  const [selectedWeather, setSelectedWeather] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  
  
  const handleWeatherSelect = (e) => {
    setSelectedWeather(e.target.value);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleImageURLChange = (e) => {
    setImageUrl(e.target.value);
  }

  const submitGarment = (e) => {
    e.preventDefault ();
    onAddItemModalSubmit({ name, imageUrl, selectedWeather});
    setName("");
    setImageUrl("");
    setSelectedWeather(""); 
  };

  useEffect(() => {
    if (name && imageUrl && selectedWeather) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, imageUrl, selectedWeather])

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      handleClose={handleClose}
      onSubmit={submitGarment}
      onChange={handleWeatherSelect}
      isOpen={isOpen}
      disabled={disabled}
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
      <label htmlFor="link" id="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          id="imageUrl"
          className="modal__input"
          placeholder="Image Url"
          onChange={handleImageURLChange}
          value={imageUrl}
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
