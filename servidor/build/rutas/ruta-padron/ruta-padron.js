"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const padronControlador_1 = require("../../controlador/padron/padronControlador");
class PadronRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/:ci', padronControlador_1.padronControlador.listarUno);
    }
}
const padronRutas = new PadronRutas();
exports.default = padronRutas.router;
