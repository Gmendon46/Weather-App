import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from './Input';
import Card from './Card';

function Weather() {
  const [city, setCity] = useState('');
  const [array, setArray] = useState([]);

  const handleOnChange = (event) => {
    setCity(event.target.value);
  };

  const handleAddButton = async () => {
    if (city.trim() !== '') {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d738fb5d22e8c7831ac1233bc05b6cb3`);
        const newItem = {
          id: Math.random(),
          city: city,
          data: response.data.weather[0],
          toCelsius: (response.data.main.temp - 273.15).toFixed(),
          toFahrenheit: (((response.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(),
          isCelsius: true,
        };
        console.log(response.data)
        setArray([...array, newItem]);
        setCity('');
      } catch (error) {
        console.log('Error:', error);
      }
    }
    else{
      alert("Please enter a city name")
    }
  };

  const toggleUnit = (itemId) => {
    console.log("Toggling unit fir item with ID:", itemId)
    setArray((prevArray) =>
      prevArray.map((item) =>
        item.id === itemId
          ? { ...item, isCelsius: !item.isCelsius }
          : item
      )
    );
  };

  const handleDeleteButton = (id) =>{
    const newArr = array.filter((item) => item.id !== id)
    setArray(newArr)
  }

  return (
    <>
      <Input
        city={city}
        onChange={handleOnChange}
        placeholder="Enter a city...."
        onClickButton={handleAddButton}
      />
 
   <div id='cards-grid'>
       {array.map((item) => (
        <div id='card' key={item.id}>
          <Card
            city={item.city}
            temp={item.isCelsius ? item.toCelsius : item.toFahrenheit}
            description = {item.data.description}
            icon={item.data.icon}
            isCelsius={item.isCelsius}
          />
          <button id='temp-unit' onClick={() => toggleUnit(item.id)}>
            {item.isCelsius ? "°F" : "°C"}
          </button>

          <button id='delete-btn' onClick={()=> handleDeleteButton(item.id)}>delete</button>
        </div>
      ))}
</div>
      
    </>
  );
}

export default Weather;
