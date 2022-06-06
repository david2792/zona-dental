"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const impuesto_control_1 = require("../../controlador/referenciales-producto/impuesto_control");
class ImpuestoRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', impuesto_control_1.impuestoControl.listarTodo);
        this.router.post('/crear/', impuesto_control_1.impuestoControl.crear);
        this.router.put('/modificar/', impuesto_control_1.impuestoControl.modificar);
    }
}
const impuestoRutas = new ImpuestoRutas();
exports.default = impuestoRutas.router;
