import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constant";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
function Main({ weatherData, handleCardClick }) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
