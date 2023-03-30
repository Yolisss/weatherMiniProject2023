import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyForm = ({ onSaveWeather, editingWeather, onUpdateWeather }) => {
  // This is the original State with not initial weather
  const [weather, setWeather] = useState(
    editingWeather || {
      username: "",
      favoritecity: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleUserNameChange = (event) => {
    const username = event.target.value;
    setWeather((weather) => ({ ...weather, username }));
  };

  const handleFavoriteCityChange = (event) => {
    const favoritecity = event.target.value;
    setWeather((weather) => ({ ...weather, favoritecity }));
  };

  const clearForm = () => {
    setWeather({ username: "", favoritecity: "" });
  };

  //A function to handle the post request
  const postWeather = (newWeather) => {
    return fetch("http://localhost:8085/api/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWeather),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveWeather(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putWeather = (toEditWeather) => {
    return fetch(`http://localhost:8085/api/weather/${toEditWeather.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditWeather),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateWeather(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (weather.id) {
      putWeather(weather);
    } else {
      postWeather(weather);
    }
  };

  return (
    <Form className="form-weather" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <input
          type="text"
          id="add-user-name"
          placeholder="username"
          required
          value={weather.username}
          onChange={handleUserNameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Favorite City</Form.Label>
        <input
          type="text"
          id="add-user-favoritecity"
          placeholder="favorite city"
          required
          value={weather.favoritecity}
          onChange={handleFavoriteCityChange}
        />
      </Form.Group>
      {/* <Form.Check
        type={"checkbox"}
        id={`isCurrent`}
        checked={weather.is_current}
        onChange={handleCheckChange}
        label={`Are they in the current program?`}
      /> */}
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {weather.id ? "Edit weather" : "Add weather"}
        </Button>
        {weather.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default MyForm;
