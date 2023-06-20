import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const geolocationAPI = navigator.geolocation
  
  
  const [location, setLocation] = useState(undefined)
  // https://www.openstreetmap.org/search?query=brisbane#map=19/-27.46907/153.02576
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
  // https://www.mapbox.com/mapbox-gljs
  useEffect(() => {
  geolocationAPI.getCurrentPosition((gelocation) => {
    console.log(gelocation)
    setLocation(gelocation)
  })}
  ,
  [geolocationAPI])
  console.log(location)
  return (
    <div className="App">
      <header className="App-header">
        {location?.coords && 
          <a href={`https://www.openstreetmap.org/#map=18/${location.coords.latitude}/${location.coords.longitude}`}>
            {`Latitude: ${location.coords.latitude} °, Longitude: ${location.coords.longitude} °`}
            </a>
        }
      </header>
    </div>
  );
}

export default App;
