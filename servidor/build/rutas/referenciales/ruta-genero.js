"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_1 = require("../../controlador/referenciales/genero");
class GeneroRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', genero_1.generoControl.listarTodoGenero);
    }
}
const generoRutas = new GeneroRutas();
exports.default = generoRutas.router;
