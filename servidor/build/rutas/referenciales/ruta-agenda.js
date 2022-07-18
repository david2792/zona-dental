"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agendamiento_1 = require("../../controlador/referenciales/agendamiento");
class AgendamientoRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crear/', agendamiento_1.agendamientoControl.guardarAgenda);
        this.router.post('/ver/', agendamiento_1.agendamientoControl.verAgenda);
        this.router.put('/anular/', agendamiento_1.agendamientoControl.anularAgenda);
    }
}
const agendamientoRutas = new AgendamientoRutas();
exports.default = agendamientoRutas.router;
