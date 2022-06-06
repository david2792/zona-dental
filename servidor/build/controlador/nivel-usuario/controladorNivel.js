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
exports.nivelControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class NivelControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = yield (0, conexionBD_1.connect)();
                const encargado = yield conexion.query("SELECT * FROM nivelesusuarios ");
                if (encargado.length > 0) {
                    conexion.end();
                    return res.json(encargado);
                }
                else {
                    conexion.end();
                    res.status(404).json({ text: 'La marca no existe' });
                }
            }
            catch (error) {
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const conn = yield (0, conexionBD_1.connect)();
            const empresa = yield conn.query('SELECT * FROM nivelesusuarios WHERE idnivelusuario=?', [id]);
            if (empresa.length > 0) {
                return res.json(empresa[0]);
            }
            conn.end();
            res.status(404).json({ text: 'el encargado no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let datos = req.body.encargados;
                console.log("para modificar " + datos);
                const idecargado = datos.idecargado;
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula;
                const values = { nombre, apellido, cedula };
                console.log(values);
                const pool = yield (0, conexionBD_1.connect)();
                const categoria = yield pool.query('UPDATE cliente SET ? WHERE idcliente = ?', [values, idecargado]);
                res.json({ message: 'El cliente fue actualizada' });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
}
exports.nivelControlador = new NivelControlador();
