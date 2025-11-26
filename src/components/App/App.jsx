import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../../context/ProtectedRoute.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getItems, deleteItem, addItem } from "../../utils/api.js";
import { signInUser, signUpUser, validateUser } from "../../utils/auth.js";
import {setToken, getToken} from "../../utils/token.js";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({name:"", email:"", password:"", avatarUrl:""});
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

  const handleRegisterModal = () => {
    setActiveModal("registration-modal");
  };

  const handleLoginModal = () => {
    setActiveModal("login-modal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModelSubmit = ({ 
    name, imageUrl, weather: selectedWeather }) => {
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
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => 
            item._id !== selectedCard._id))
        closeActiveModal();
      })
      .catch(console.error);
  };

  const switchToLoginModal = () => {
    closeActiveModal();
    setActiveModal("login-modal")
  }

  const switchToRegisterModal = () => {
    closeActiveModal();
    setActiveModal("registration-modal")
  }

  const handleRegistration = ({ 
    name, email, password, avatarUrl}) => {
    signUpUser({name, email, password, avatarUrl})
      .then((data) => {
        // Handle successful registration
        setToken(data.jwt);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const loginModalSubmit = ({ email, password }) => {
    signInUser({email, password})
      .then((data) => {
        setToken(data.jwt);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    validateUser(jwt)
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);
        navigate("/profile")
      })
      .catch(console.error);
  }, [navigate])


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
            isLoggedIn={isLoggedIn}
            weatherData={weatherData} 
            handleRegistration={handleRegisterModal}
            handleLogIn={handleLoginModal}
          />
          <Routes>
            <Route 
              path="*"
              element={
                isLoggedIn ? (<Navigate to="/" replace />) 
                : (<Navigate to="/signup" replace />)
              }
              />
            <Route
              path="/signup"
              element={
              <Main
              weatherData={weatherData}
              clothingItems={clothingItems}
              onCardClick={handleCardClick}
            /> }
            />   
            <Route 
              path="/" 
              element={<Main  
                weatherData={weatherData} 
                onCardClick={handleCardClick} 
                clothingItems={clothingItems} /> } />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute> 
                  <Profile 
                    onCardClick={handleCardClick}
                    isOpen={handleAddClick}
                    clothingItems={clothingItems}/>
                </ProtectedRoute> 
              }/>
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
          isLoggedIn={isLoggedIn}
          handleClose={closeActiveModal}
          onDelete={handleDeleteItem}
          card={selectedCard}
          buttonText={isLoading ? 'Deleting...' : 'Yes, delete item'}
          handleRegistration={handleRegisterModal}
          handleLogIn={handleLoginModal}
        />
        <RegisterModal
          handleClose={closeActiveModal}
          isOpen={activeModal === "registration-modal"}
          handleRegistration={handleRegistration}
          buttonText={isLoading ? "Reviewing..." : "Sign Up"}
          buttonSwitchingText={"or Log In"}
          handleSwitchingModal={switchToLoginModal}
        />
        <LoginModal
          handleClose={closeActiveModal}
          isOpen={activeModal === "login-modal"}
          handleLogIn={loginModalSubmit}
          buttonText={isLoading ? "Logging in..." : "Log in"}
          buttonSwitchingText={"or Sign up"}
          handleSwitchingModal={switchToRegisterModal}
          />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
