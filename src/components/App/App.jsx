import { useState, useEffect } from 'react'
import './App.css'
import { coordinates, APIkey } from '../../utils/constant'
import { getWeather, filterWeatherData} from '../../utils/weatherApi'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999 }, city:"" })
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  
  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  const handleCardClick = (card) => {
    setActiveModal("preview-garment");
    setSelectedCard(card);

  }

  const closeActiveModal = () => {
    setActiveModal("")
  }

  const submitGarment = (e) => {
    e.preventDefault();
    // Logic to handle garment submission
    closeActiveModal();
  }

  useEffect( () => {
    getWeather (coordinates, APIkey)
    .then((data)=> {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
  }, [])

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm 
        title="New garment" 
        buttonText="Add garment"
        activeModal={activeModal}
        handleClose={closeActiveModal}
        onSubmit={submitGarment}>
      <label htmlFor="name" className="modal__label">
          Name
          <input 
              type="text" 
              id="name" 
              className="modal__input" 
              placeholder="Name" 
              required/>
      </label>
      <label htmlFor="imageUrl" id="imageUrl" className="modal__label">
          Image 
          <input 
              type="url" 
              id="imageUrl" 
              className="modal__input" 
              placeholder="Image Url" 
              required/>
      </label>
      <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__input_type_radio">
              <input id="hot" type="radio" name="modal__radio-input"/> Hot
          </label>
          <label htmlFor="warm" className="modal__label modal__input_type_radio">
              <input id="warm" type="radio" name="modal__radio-input"/> Warm
          </label>
          <label htmlFor="cold" className="modal__label modal__input_type_radio">
              <input id="cold" type="radio" name="modal__radio-input"/> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} handleClose={closeActiveModal} /> 
    </div>
  )
}

export default App
