import sunny from '../../images/sunny.svg'
import './WeatherCard.css'

function WeatherCard({ weatherData}) {
    return (
        <section className="weather-card">
            <p className='weather-card__temp'>{weatherData.temp.F}&deg;F</p>
            <img className='weather-card__image' src={sunny} alt='sunny skies'/>
        </section>
    )
}

export default WeatherCard;