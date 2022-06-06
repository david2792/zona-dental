"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controladorNivel_1 = require("../../controlador/nivel-usuario/controladorNivel");
class NivelRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', controladorNivel_1.nivelControlador.listar);
        this.router.post('/agregar', controladorNivel_1.nivelControlador.crear);
        this.router.put('/actualizar', controladorNivel_1.nivelControlador.actualizar);
    }
}
const nivelRutas = new NivelRutas();
exports.default = nivelRutas.router;
