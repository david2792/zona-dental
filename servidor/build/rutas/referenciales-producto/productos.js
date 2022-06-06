"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_control_1 = require("../../controlador/referenciales-producto/producto_control");
class ProductosRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/guardar', producto_control_1.productoControl.crear);
        this.router.put('/modificar/', producto_control_1.productoControl.modificar);
        this.router.get('/listar', producto_control_1.productoControl.listarTodo);
    }
}
const productosRutas = new ProductosRutas();
exports.default = productosRutas.router;
