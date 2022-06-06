"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlUsuario_1 = require("../../controlador/usuario/controlUsuario");
class UsuarioRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', controlUsuario_1.usuarioControlador.listar);
        this.router.post('/agregar', controlUsuario_1.usuarioControlador.crear);
        this.router.put('/modificar', controlUsuario_1.usuarioControlador.actualizar);
    }
}
const usuarioRutas = new UsuarioRutas();
exports.default = usuarioRutas.router;
