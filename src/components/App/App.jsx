import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey, defaultClothingItems } from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  const handleAddItemModelSubmit = ({ name, link, selectedWeather }) => {
    setClothingItems((prevItems) => [
      { name, link, weather: selectedWeather }, 
      ...prevItems]);
    closeActiveModal();
  }


  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);


  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange}}>
    <div className="app">
      <div className="app__content">
        <Header 
        handleAddClick={handleAddClick} 
        weatherData={weatherData} />
        <Routes>
          <Route 
            path="/" 
            element={<Main  
              weatherData={weatherData} 
              handleCardClick={handleCardClick} 
              clothingItems={clothingItems} /> } />
          <Route path="/profile" element={<Profile handleAddClick={handleAddClick}/>} />
        </Routes>
        <Footer />
      </div>
      <AddItemModal
        handleClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
        onAddItemModalSubmit={handleAddItemModelSubmit} />
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
