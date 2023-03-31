import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";
import ShowCity from "./ShowCity";

const City = ({ city, toUpdate, toDelete }) => {
  console.log(city);
  const onUpdate = (toUpdateCity) => {
    toUpdate(toUpdateCity);
  };

  const onDelete = (toDeleteCity) => {
    toDelete(toDeleteCity);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {city.username} {city.city}
        </Card.Title>
        <Button
          variant="outline-danger"
          onClick={() => {
            onDelete(city);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            onUpdate(city);
          }}
          style={{ padding: "0.6em" }}
        >
          {" "}
          <ioicons.IoSync />
        </Button>
        <ShowCity />
      </Card.Body>
    </Card>
  );
};

export default City;
