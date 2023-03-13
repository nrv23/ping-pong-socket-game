const express = require("express");
const path = require("path");
const api = express();

api.use(express.static(path.join(__dirname, 'public'))) // dejar la carpeta como publica
api.use("/",express.static("index.html")); // servir el archivo index html para que solo tenga que cargar la ip del servidor y se le cargue el juego

module.exports = api;