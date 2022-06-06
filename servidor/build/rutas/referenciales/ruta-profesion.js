"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesion_1 = require("../../controlador/referenciales/profesion");
class ProfesionRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', profesion_1.profesionControl.listarTodoProfesion);
    }
}
const profesionRutas = new ProfesionRutas();
exports.default = profesionRutas.router;
