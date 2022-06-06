"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const desposito_control_1 = require("../../controlador/referenciales-producto/desposito_control");
class DepositoRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', desposito_control_1.depositoControl.listarTodo);
    }
}
const depositoRutas = new DepositoRutas();
exports.default = depositoRutas.router;
