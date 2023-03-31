import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import City from "./City";

const ListFavoriteCity = () => {
  // this is my original state with an array of weather
  const [cities, setCities] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingCity, setEditingCity] = useState(null);

  const loadCities = () => {
    // A function to fetch the list of weather that will be load anytime that list change
    fetch("http://localhost:8085/api/favoritecity")
      .then((response) => response.json())
      .then((cities) => {
        setCities(cities);
      });
  };

  useEffect(() => {
    loadCities();
  }, []);

  const onSaveCity = (newCity) => {
    //console.log(newWeather, "From the parent - List of Students");
    setCities((cities) => [...cities, newCity]);
  };

  //A function to control the update in the parent (weather component)
  const updateCity = (savedCity) => {
    // console.log("Line 29 savedWeather", savedWeather);
    // This function should update the whole list of weather -
    loadCities();
  };

  //A function to handle the Delete funtionality
  const onDelete = (cities) => {
    //console.log(weather, "delete method")
    return fetch(`http://localhost:8085/api/favoritecity/${cities.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadCities();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateCity) => {
    //console.log(toUpdateWeather);
    setEditingCity(toUpdateCity);
  };

  return (
    <div className="mybody">
      <div className="list-weather">
        <h2>Weather App</h2>
        <ul>
          {cities.map((city) => {
            return (
              <li key={city.id}>
                {" "}
                <City city={city} toDelete={onDelete} toUpdate={onUpdate} />
              </li>
            );
          })}
        </ul>
      </div>
      <MyForm
        key={editingCity ? editingCity.id : null}
        onSaveCity={onSaveCity}
        editingWeather={editingCity}
        onUpdateStudent={updateCity}
      />
    </div>
  );
};

export default ListFavoriteCity;
