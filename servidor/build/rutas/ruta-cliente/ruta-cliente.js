"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteControlador_1 = require("../../controlador/cliente/clienteControlador");
class ClienteRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', clienteControlador_1.clienteControlador.listar);
        this.router.post('/agregar', clienteControlador_1.clienteControlador.crear);
        this.router.put('/modificar', clienteControlador_1.clienteControlador.actualizar);
        this.router.put('/voto', clienteControlador_1.clienteControlador.voto);
        this.router.get('/cantidadVotantes', clienteControlador_1.clienteControlador.CantidadVotantesNacio);
        this.router.get('/novoto', clienteControlador_1.clienteControlador.listarVotantes);
        this.router.get('/buscar/:id', clienteControlador_1.clienteControlador.Buscar);
        //    rutas de contar
        this.router.get('/nacional', clienteControlador_1.clienteControlador.CantidadVotantesNacio);
        this.router.get('/capillita', clienteControlador_1.clienteControlador.CantidadVotantesCapillita);
        this.router.get('/enrique', clienteControlador_1.clienteControlador.CantidadVotantesEnrique);
        this.router.get('/agupety', clienteControlador_1.clienteControlador.CantidadVotantesAguapety);
        this.router.get('/sanantonio', clienteControlador_1.clienteControlador.CantidadVotantesSanAntonio);
        this.router.get('/cnloviedo', clienteControlador_1.clienteControlador.CantidadVotantesCnelOviedo);
        this.router.get('/bernardino', clienteControlador_1.clienteControlador.CantidadVotantesCaballero);
        this.router.get('/escalada', clienteControlador_1.clienteControlador.CantidadVotantesWnsela);
        this.router.get('/calle1', clienteControlador_1.clienteControlador.CantidadVotantesCalle1);
        this.router.get('/calle2', clienteControlador_1.clienteControlador.CantidadVotantesCalle2);
        this.router.get('/peralta', clienteControlador_1.clienteControlador.CantidadVotantesAlicio);
        this.router.get('/sanroque', clienteControlador_1.clienteControlador.CantidadVotantesSanRoque);
        this.router.get('/total', clienteControlador_1.clienteControlador.listartOTAL);
    }
}
const cliRutas = new ClienteRutas();
exports.default = cliRutas.router;
