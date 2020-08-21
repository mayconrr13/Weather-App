import React from 'react';
import { GlobalStorage } from './GlobalContext'
import WeatherCheck from './WeatherCheck';

function App() {
  return (
    <GlobalStorage>
        <WeatherCheck/>
    </GlobalStorage>
  );
}

export default App;