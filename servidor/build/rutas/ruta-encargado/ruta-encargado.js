"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encargadoControlador_1 = require("../../controlador/encargado/encargadoControlador");
class EncargadosRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', encargadoControlador_1.encargadoControlador.listar);
        this.router.post('/agregar', encargadoControlador_1.encargadoControlador.crear);
        this.router.put('/modificar', encargadoControlador_1.encargadoControlador.actualizar);
    }
}
const encargadoRutas = new EncargadosRutas();
exports.default = encargadoRutas.router;
