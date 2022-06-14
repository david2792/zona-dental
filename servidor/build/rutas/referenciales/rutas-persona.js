"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_1 = require("../../controlador/referenciales/persona");
const pacientes_1 = require("../../controlador/referenciales-personas/pacientes");
class Persona_Rutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crear/', persona_1.personaControl.crear);
        this.router.get('/listar', persona_1.personaControl.listarTodo);
        this.router.post('/crearpaciente', pacientes_1.pacienteControl.crear);
    }
}
const personaRutas = new Persona_Rutas();
exports.default = personaRutas.router;
