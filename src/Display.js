import {useState, useEffect} from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function Display({display}){
  const [bizToDisplay, setBizToDisplay] = useState(getRandomInt(display.businesses.length))
  const [mapsLink, setMapsLink] = useState(null);
  useEffect(function(){
    if(!display) return;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(display.businesses[bizToDisplay].coordinates);
    let lat = display.businesses[bizToDisplay].coordinates.latitude, lng = display.businesses[bizToDisplay].coordinates.longitude;
    
    fetch(`https://8311-169-234-62-98.ngrok.io/directions?latitude=${lat}&longitude=${lng}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setMapsLink(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
    }, [mapsLink, bizToDisplay])

  function clickButton() {
    setBizToDisplay(getRandomInt(display.businesses.length))
  }
    return(
    <div className= 'RatingContainer'>
      <p className= "Rating">Name: {
        (JSON.stringify(display.businesses[bizToDisplay].name)).split("\"")
      }</p>

      <p className= "Rating">Rating: {
        (JSON.stringify(display.businesses[bizToDisplay].rating)).split("\"")
      } </p>

      <p className= "Rating">Reviews: {
        (JSON.stringify(display.businesses[bizToDisplay].review_count)).split("\"")
      } </p>

      <p className= "Rating">Phone Number: {
        (JSON.stringify(display.businesses[bizToDisplay].display_phone)).split("\"")
      } </p>

      {/* print everything */}
      {/* <p className= "Everything">{
        JSON.stringify(display.businesses[0])
      }</p> */}

      {display&& <button className ="WTFButton" onClick={clickButton}>W.T.F</button>}

      <p className = "getDirections">
      {mapsLink && <a href={mapsLink} target="_blank" rel="noopener noreferrer">Click Here For Directions</a>}
      </p>

      </div>)
}

export default Display