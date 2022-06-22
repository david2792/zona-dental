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
        //    rutas de pacientes
        this.router.get('/listar-paciente', persona_1.personaControl.listarPaciente);
        this.router.get('/uno/:codigo', persona_1.personaControl.listarUnPaciente);
        this.router.put('/modificar/:codigo', persona_1.personaControl.modificarPaciente);
        // rutas doctores
        this.router.post('/doctor', persona_1.personaControl.guardarDoctor);
        this.router.get('/doctor/listar', persona_1.personaControl.listarDoctores);
    }
}
const personaRutas = new Persona_Rutas();
exports.default = personaRutas.router;
