var express = require('express');
var router = express.Router();
var apiController = require("../controllers/apiController");
var personajesMulter = require("../middlewares/multerPersonajes");
var peliculasMulter = require("../middlewares/multerPeliculas");

router.post("/auth/login",apiController.loguin);
router.post("/auth/register",apiController.register);
router.get("/characters",apiController.mostrarPersonajes);
router.post("/characters/crear",personajesMulter.any(),apiController.crearPersonaje);
router.put("/characters/editar/:id",personajesMulter.any(),apiController.editarPersonaje);
router.delete("/characters/eliminar/:id",apiController.eliminarPersonaje);
router.get("/characters/detalle/:id",apiController.detallePersonaje);
router.get("/movies",apiController.mostrarPeliculas);
router.get("/movies/detalle/:id",apiController.detallePelicula);
router.post("/movies/crear",peliculasMulter.any(),apiController.crearPeliculas);
router.put("/movies/editar/:id",peliculasMulter.any(),apiController.editarPeliculas);
router.delete("/movies/eliminar/:id",apiController.eliminarPelicula);
module.exports = router;
