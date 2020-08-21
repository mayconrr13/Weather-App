import React, { useRef, useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import WeatherForecast from './components/WeatherForecast'

import searchIcon from './assets/icons/search.svg'

import './WeatherCheck.css'

const WheaterCheck = () => {
    const global = useContext(GlobalContext)
    const inputCity = useRef()

    function handleSubmit(event) {
        event.preventDefault()
        global.setError('')
        global.setLoading(true)
        global.handleGetData(inputCity.current.value)
        return localStorage.setItem('cityName', global.data)
    }
    
    return (
        <div id="app" className={global.backgroundTheme}>
            <form onSubmit={handleSubmit}>
                <input 
                    id="city"
                    type="text" 
                    placeholder="Type the city name.." 
                    ref={inputCity} 
                    required/>
                <button>
                    <img src={searchIcon} alt="search"/>
                </button>
            </form>
            { global.loading && <p className="loading-message">...</p> }
            { !global.loading && global.data 
            ? <WeatherForecast city={global.data.name} temperature={global.data.main.temp} icon={global.data.weather[0].icon} alt={global.data.weather[0].main}/>
            : <p className="error-message">{global.error}</p>}
        </div>
    )
}

export default WheaterCheck