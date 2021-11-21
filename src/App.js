// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react' //useState and useEffects are hooks which allow us to "hook" into React features
import Display from './Display'

function App() {
  const [location, setLocation] = useState(''); //set location to an empty string
  const [display, setDisplay] = useState(''); //set display to empty string
  useEffect(function () {
    setLocation(location)
  }, [location])

  //constants for coordinates
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  function show_location(location) {
    console.log(location)
  }

  //getting current location using geolocation API
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  useEffect(function () {
    if (lat && lng) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://8311-169-234-62-98.ngrok.io/restaurants?latitude=${lat}&longitude=${lng}`, requestOptions)
        .then(response => response.json())
        .then(result => setDisplay(result))
        .catch(error => console.log('error', error));
    }
  }, [lat, lng])

  return (
    <div>
      {/* Code for "Location" in center of screen */}
      <p className="Header">{
        !display && <label for="name">Where To Feast?</label>}
      </p>

      {/* text in the search button */}
      {/* <p className="searchText">
        {!display && <button type="submit" onClick={() => show_location(location)}>
          Search
        </button>}
      </p> */}

      {/* Search Bar */}
      {/* {!display && <input className="EnterText" value={location} onChange={e => setLocation(e.target.value)} type="text" />} */}
      
      {/* Button to get location */}
      {!display && <button className="WTFButton" onClick={getLocation}>W. T. F.</button>}
      

      <p>{status}</p>
      {display &&
        <Display 
          display={display}></Display>
          }
    </div>
  );
}

export default App;