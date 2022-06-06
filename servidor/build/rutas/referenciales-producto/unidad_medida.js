"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unida_medida_control_1 = require("../../controlador/referenciales-producto/unida_medida_control");
class MedidaRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', unida_medida_control_1.medidaControl.listarTodo);
        this.router.post('/crear/', unida_medida_control_1.medidaControl.crear);
        this.router.put('/modificar/', unida_medida_control_1.medidaControl.modificar);
    }
}
const medidaRutas = new MedidaRutas();
exports.default = medidaRutas.router;
