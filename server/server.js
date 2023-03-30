const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8085;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for weather in the endpoint '/api/weather'
app.get("/api/weather", async (req, res) => {
  try {
    const { rows: weather } = await db.query("SELECT * FROM weather");
    res.send(weather);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/weather", async (req, res) => {
  try {
    const newWeather = {
      username: req.body.username,
      favoritecity: req.body.favoritecity,
    };
    //console.log([newWeather.username, newWeather.favoritecity, newWeather.iscurrent]);
    const result = await db.query(
      "INSERT INTO weather(username, favoritecity) VALUES($1, $2) RETURNING *",
      [newWeather.username, newWeather.favoritecity]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for weather
app.delete("/api/weather/:weatherId", async (req, res) => {
  try {
    const weatherId = req.params.weatherId;
    await db.query("DELETE FROM weather WHERE id=$1", [weatherId]);
    console.log("From the delete request-url", weatherId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a student
app.put("/api/weather/:weatherId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const weatherId = req.params.weatherId;
  const updatedWeather = {
    id: req.body.id,
    username: req.body.username,
    favoritecity: req.body.favoritecity,
    iscurrent: req.body.is_current,
  };
  console.log("In the server from the url - the student id", weatherId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedWeather
  );
  // UPDATE weather SET favoritecity = "something" WHERE id="16";
  const query = `UPDATE weather SET username=$1, favoritecity=$2 WHERE id=${weatherId} RETURNING *`;
  const values = [updatedWeather.username, updatedWeather.favoritecity];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
