const express = require('express');
const controladorCurso = require('../controllers/curso.controller');

const api = express.Router();

api.post('/agregarCurso', controladorCurso.agregarCurso);

module.exports = api;