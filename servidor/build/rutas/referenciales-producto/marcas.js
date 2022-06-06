"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marca_control_1 = require("../../controlador/referenciales-producto/marca_control");
class MarcaRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', marca_control_1.marcaControl.listarTodo);
        this.router.post('/crear/', marca_control_1.marcaControl.crear);
        this.router.put('/modificar/', marca_control_1.marcaControl.modificar);
    }
}
const marcaRutas = new MarcaRutas();
exports.default = marcaRutas.router;
