import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const GlobalContext = createContext()

export const GlobalStorage = ({children}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [backgroundTheme, setBackgroundTheme] = useState('')

    const apiKey = '88eaae48c84e3d657e0cf8cae05bb77b'
    
    useEffect(() => {
        const savedCity = localStorage.getItem('cityName')
        setLoading(true)
        savedCity ? handleGetData(savedCity) : setLoading(false)
    }, [])

    useEffect(() => {
        if(data) {
            data.dt >= data.sys.sunset || data.dt <= data.sys.sunrise ? setBackgroundTheme('night-theme') : setBackgroundTheme('day-theme')
        } else {
            setBackgroundTheme('day-theme')
        }
    }, [data])

    function handleGetData(city) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`)
            .then( res => { 
                setData(res.data)
                localStorage.setItem('cityName', res.data.name)
            })
            .catch( err => {
                setData(null)
                localStorage.removeItem('cityName')
                return setError('City not found!')
            })
            .finally( () => {setLoading(false)})       
    }

    

    return (
        <GlobalContext.Provider value={{ data, setData, handleGetData, loading, setLoading, error, setError, backgroundTheme }} >
            {children}
        </GlobalContext.Provider>
    )
}