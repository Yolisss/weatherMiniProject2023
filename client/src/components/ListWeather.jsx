import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Weather from "./Weather";

const ListWeather = () => {
  // this is my original state with an array of weather
  const [weather, setWeather] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingWeather, setEditingWeather] = useState(null);

  const loadWeather = () => {
    // A function to fetch the list of weather that will be load anytime that list change
    fetch("http://localhost:8085/api/favoritecity")
      .then((response) => response.json())
      .then((weather) => {
        setWeather(weather);
      });
  };

  useEffect(() => {
    loadWeather();
  }, [weather]);

  const onSaveWeather = (newWeather) => {
    //console.log(newWeather, "From the parent - List of Students");
    setWeather((weather) => [...weather, newWeather]);
  };

  //A function to control the update in the parent (weather component)
  const updateWeather = (savedWeather) => {
    // console.log("Line 29 savedWeather", savedWeather);
    // This function should update the whole list of weather -
    loadWeather();
  };

  //A function to handle the Delete funtionality
  const onDelete = (weather) => {
    //console.log(weather, "delete method")
    return fetch(`http://localhost:8085/api/favoritecity/${weather.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadWeather();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateWeather) => {
    //console.log(toUpdateWeather);
    setEditingWeather(toUpdateWeather);
  };

  return (
    <div className="mybody">
      <div className="list-weather">
        <h2>Weather App</h2>
        <ul>
          {weather.map((weather) => {
            return (
              <li key={weather.id}>
                {" "}
                <Weather
                  weather={weather}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <MyForm
        key={editingWeather ? editingWeather.id : null}
        onSaveWeather={onSaveWeather}
        editingWeather={editingWeather}
        onUpdateStudent={updateWeather}
      />
    </div>
  );
};

export default ListWeather;
