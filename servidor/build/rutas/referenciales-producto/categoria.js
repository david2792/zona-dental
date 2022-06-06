"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_control_1 = require("../../controlador/referenciales-producto/categoria_control");
class CategoriaRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/', categoria_control_1.categoriaControl.listarTodo);
        this.router.post('/crear', categoria_control_1.categoriaControl.crear);
        this.router.put('/modificar/', categoria_control_1.categoriaControl.modificar);
    }
}
const categoriaRutas = new CategoriaRutas();
exports.default = categoriaRutas.router;
