import { useState, useEffect } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F")

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }
  
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-garment");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const submitGarment = (e) => {
    e.preventDefault();
    // Logic to handle garment submission
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleWeatherSelect = (e) => {
    setSelectedWeather(e.target.id);
  };

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange}}>
    <div className="app">
      <div className="app__content">
        <Header 
        handleAddClick={handleAddClick} 
        weatherData={weatherData} />
        <Main 
        weatherData={weatherData} 
        handleCardClick={handleCardClick}
         />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        //activeModal={activeModal}
        handleClose={closeActiveModal}
        onSubmit={submitGarment}
        onChange={handleWeatherSelect}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="imageUrl" id="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            className="modal__input"
            placeholder="Image Url"
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
            />{" "}
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
            />{" "}
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
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        handleClose={closeActiveModal}
        isOpen={activeModal === "preview-garment"}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
