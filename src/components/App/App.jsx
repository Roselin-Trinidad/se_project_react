import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getItems, deleteItem, addItem } from "../../utils/api.js";

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
  const [clothingItems, setClothingItems] = useState([]);

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

  const handleDeleteModal = () => {
    setActiveModal("delete-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModelSubmit = ({ name, imageUrl, weather: selectedWeather }) => {
    addItem({ name, imageUrl, weather: selectedWeather})
    .then((newItem) => {
      console.log('New item from server:', newItem); 
      setClothingItems((prevItems) => [
        newItem, ...prevItems]);
      closeActiveModal();
    })
    
  }

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id))
        setActiveModal("");
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider 
    value={{ currentTemperatureUnit, handleToggleSwitchChange}}>
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
          <Route 
            path="/profile" 
            element={<Profile 
            onCardClick={handleCardClick}
            isOpen={handleAddClick}
            clothingItems={clothingItems}/>}
             />
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
        onDelete={handleDeleteModal}
      />
      <DeleteModal 
        isOpen={activeModal === "delete-garment"}
        handleClose={closeActiveModal}
        onDelete={handleDeleteItem}
        card={selectedCard}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
