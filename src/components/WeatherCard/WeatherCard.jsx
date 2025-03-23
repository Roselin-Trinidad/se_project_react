import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constant.js";

function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        className="weather-card__image"
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
      />
    </section>
  );
}

export default WeatherCard;
