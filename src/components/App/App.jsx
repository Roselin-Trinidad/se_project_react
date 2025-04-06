import React from "react";
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
import useModalClose from "../../hooks/useModalClose.js";

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
  const [isLoading, setIsLoading] = React.useState(false);

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

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal])

  const handleAddItemModelSubmit = ({ name, imageUrl, weather: selectedWeather }) => {
    setIsLoading(true);
    addItem({ name, imageUrl, weather: selectedWeather})
    .then((newItem) => { 
      setClothingItems((prevItems) => [
        newItem, ...prevItems]);
      
      closeActiveModal();
    })
    .catch(console.error)
    .finally(() => {
      setIsLoading(false);
    });
  }

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id))
        closeActiveModal();
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
        onAddItemModalSubmit={handleAddItemModelSubmit}
        buttonText={isLoading ? 'Saving...' : 'Add Garment'} />
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
        buttonText={isLoading ? 'Deleting...' : 'Yes, delete item'}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
