import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyForm = ({ onSaveCity, editingCity, onUpdateCity }) => {
  // This is the original State with not initial city
  const [city, setCity] = useState(
    editingCity || {
      username: "",
      city: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleUserNameChange = (event) => {
    const username = event.target.value;
    setCity((city) => ({ ...city, username }));
  };

  const handleFavoriteCityChange = (event) => {
    const favoritecity = event.target.value;
    setCity((city) => ({ ...city, favoritecity }));
  };

  const clearForm = () => {
    setCity({ username: "", city: "" });
  };

  //A function to handle the post request
  const postCity = (newCity) => {
    return fetch("http://localhost:8085/api/favoritecity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCity),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveCity(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putCity = (toEditCity) => {
    return fetch(`http://localhost:8085/api/favoritecity/${toEditCity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditCity),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateCity(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.id) {
      putCity(city);
    } else {
      postCity(city);
      console.log({ postCity });
    }
  };

  return (
    <Form className="form-city" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <input
          type="text"
          id="add-user-name"
          placeholder="username"
          required
          value={city.username}
          onChange={handleUserNameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Favorite City</Form.Label>
        <input
          type="text"
          id="add-user-city"
          placeholder="favorite city"
          required
          value={city.favoritecity}
          onChange={handleFavoriteCityChange}
        />
      </Form.Group>
      {/* <Form.Check
        type={"checkbox"}
        id={`isCurrent`}
        checked={city.is_current}
        onChange={handleCheckChange}
        label={`Are they in the current program?`}
      /> */}
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {city.id ? "Edit city" : "Add city"}
        </Button>
        {city.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default MyForm;
