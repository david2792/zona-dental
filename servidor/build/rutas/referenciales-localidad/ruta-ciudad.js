"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudad_1 = require("../../controlador/referenciales-localidad/ciudad");
class CiudadRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', ciudad_1.ciudadControl.listarTodoCiudad);
    }
}
const ciudadRutas = new CiudadRutas();
exports.default = ciudadRutas.router;
