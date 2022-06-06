"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_civil_1 = require("../../controlador/referenciales/estado_civil");
class Estado_Civil_Rutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', estado_civil_1.estado_Civil_Control.listarTodoCivil);
    }
}
const estado_Civil_Rutas = new Estado_Civil_Rutas();
exports.default = estado_Civil_Rutas.router;
