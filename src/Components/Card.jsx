import React, { useState } from 'react'

function Card({city, temp, description, isCelsius, icon}) {
 const iconURL = `http://openweathermap.org/img/w/${icon}.png`;
    return (
    <div>
    <span id='city-name'>{city}</span>
    <h3>{temp} {isCelsius ? "°C" : "°F"}</h3>
    <div id='card-des'>
    <span>{description}</span>
    <img src={iconURL} alt=""/>
    </div>
    </div>
  )
}

export default Card