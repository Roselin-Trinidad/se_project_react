import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constant.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
      />
    </section>
  );
}

export default WeatherCard;
