const express = require('express');
const controladorCurso = require('../controllers/curso.controller');

const api = express.Router();

api.post('/agregarCurso', controladorCurso.agregarCurso);
api.put('/editarCurso/:idCurso', controladorCurso.editarCurso);
api.delete('/eliminarCurso/:idCurso', controladorCurso.eliminarCurso);
api.get('/buscarCurso/:idCurso', controladorCurso.obtenerCurso);

module.exports = api;