import sunny from '../../images/sunny.svg'
import './WeatherCard.css'

function WeatherCard() {
    return (
        <section className="weather-card">
            <p className='weather-card__temp'>75&deg;F</p>
            <img className='weather-card__image' src={sunny} alt='sunny skies'/>
        </section>
    )
}

export default WeatherCard;