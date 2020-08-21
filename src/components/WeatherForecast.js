import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import './WeatherForecast.css'

import cloudyIcon from '../assets/icons/cloudy.svg'
import moonIcon from '../assets/icons/moon.svg'
import rainIcon from '../assets/icons/rain.svg'
import snowIcon from '../assets/icons/snow.svg'
import stormIcon from '../assets/icons/storm.svg'
import sunnyIcon from '../assets/icons/sunny.svg'
import windIcon from '../assets/icons/wind.svg'

const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const weatherConditions = ["01", "02", "03", "04", "09", "10", "11", "13", "50"]
const weatherIcons = [sunnyIcon, cloudyIcon, cloudyIcon, cloudyIcon, rainIcon, rainIcon, stormIcon, snowIcon, windIcon]

const WeatherForecast = ({ city, temperature, icon, alt }) => {
    const [weatherIcon, setWeatherIcon] = useState(null)
    const global = useContext(GlobalContext)

    let date = new Date()
    const dayInfo = `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    const iconCode = (Array.from(icon)).filter((digit, index) => index !== 2).join('')
    
    useEffect(() => {
        return handleWeatherIcon()
    }, [weatherIcon])

    function handleWeatherIcon() {
        if (iconCode !== '01') {
            return setWeatherIcon(weatherIcons[weatherConditions.indexOf(iconCode)])
        } else {
            if (global.data.dt >= global.data.sys.sunset || global.data.dt <= global.data.sys.sunrise) {
                return setWeatherIcon(moonIcon)
            } else {
                return setWeatherIcon(sunnyIcon)
            }
        }
    }

    return (
        <div className="forecast">
            <div className="info">
                <p className="city-name">{city}</p>
                <p className="date">{dayInfo}</p>
            </div>
            <img src={weatherIcon} alt={alt}/>
            <div className="set-temperature">
                <p className="temperature">{temperature.toFixed(0)}</p>
                <p>ºC</p>
            </div>
        </div>
    )
}

export default WeatherForecast