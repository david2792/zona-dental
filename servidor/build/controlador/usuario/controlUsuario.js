"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
const controladoABM_1 = require("../controladoABM");
class UsuarioControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encargado = yield controladoABM_1.abm.consultar("SELECT * FROM vusuarios ");
                if (encargado.length > 0) {
                    return res.json(encargado);
                }
                else {
                    res.status(404).json({ text: 'La marca no existe' });
                }
            }
            catch (error) {
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let datos = req.body.usuarios;
                console.log("para guardar " + datos.idniveleusuario);
                const idniveleusuario = datos.idniveleusuario;
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula.replace(/\./g, '');
                const celular = datos.celular;
                const usuario = datos.usuario;
                const clave = datos.clave;
                const values = { idniveleusuario, cedula, nombre, apellido, celular, usuario, clave };
                const conexion = yield (0, conexionBD_1.connect)();
                try {
                    const encargado = yield conexion.query("INSERT INTO usuarios SET ? ", values);
                    // const encargado = await abm.consultar("SELECT * FROM encargados ") 
                    res.status(200).json(encargado);
                    conexion.end();
                }
                catch (error) {
                    console.log(error);
                    res.status(404).json({ text: 'ocurrio un error' });
                    conexion.end();
                }
            }
            catch (error) {
                res.status(500).json({ text: 'ocurrio un error' });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("para modificar ");
            try {
                let datos = req.body.usuarios;
                console.log("para modificar ");
                const idusuario = datos.idusuario;
                const idniveleusuario = datos.idniveleusuario;
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula.replace(/\./g, '');
                const celular = datos.celular;
                const usuario = datos.usuario;
                const clave = datos.clave;
                const values = { idusuario, idniveleusuario, cedula, nombre, apellido, celular, usuario, clave };
                const conexion = yield (0, conexionBD_1.connect)();
                try {
                    const encargado = yield conexion.query('UPDATE usuarios SET ? WHERE idusuario = ?', [values, idusuario]);
                    conexion.end();
                    res.status(200).json(encargado);
                }
                catch (error) {
                    conexion.end();
                    console.log(error);
                    res.status(500).json({ text: 'ocurrio un error' });
                }
            }
            catch (error) {
                console.log('error' + error);
                res.status(404).json({ text: 'ocurrio un error' });
            }
        });
    }
}
exports.usuarioControlador = new UsuarioControlador();
