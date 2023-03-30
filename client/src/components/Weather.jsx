import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Weather = ({ weather, toUpdate, toDelete }) => {
  const onUpdate = (toUpdateWeather) => {
    toUpdate(toUpdateWeather);
  };

  const onDelete = (toDeleteWeather) => {
    toDelete(toDeleteWeather);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {weather.username} {weather.favoritecity}{" "}
        </Card.Title>
        <Button
          variant="outline-danger"
          onClick={() => {
            onDelete(weather);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            onUpdate(weather);
          }}
          style={{ padding: "0.6em" }}
        >
          {" "}
          <ioicons.IoSync />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Weather;
