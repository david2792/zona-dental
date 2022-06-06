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
exports.encargadoControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
const controladoABM_1 = require("../controladoABM");
class EncargadoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encargado = yield controladoABM_1.abm.consultar("SELECT * FROM encargados ");
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
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const conn = yield (0, conexionBD_1.connect)();
            const empresa = yield conn.query('SELECT * FROM cliente WHERE idencargado=?', [id]);
            if (empresa.length > 0) {
                return res.json(empresa[0]);
            }
            res.status(404).json({ text: 'el encargado no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let datos = req.body.encargados;
                console.log("para guardar " + datos);
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula.replace(/\./g, '');
                const carpeta = datos.carpeta;
                const values = { nombre, apellido, cedula, carpeta };
                const conexion = yield (0, conexionBD_1.connect)();
                try {
                    const encargado = yield conexion.query("INSERT INTO encargados SET ? ", values);
                    // const encargado = await abm.consultar("SELECT * FROM encargados ") 
                    res.status(200).json(encargado);
                    conexion.end();
                }
                catch (error) {
                    res.status(404).json({ text: 'ocurrio un error' });
                    conexion.end();
                }
            }
            catch (error) {
                res.status(500).json({ text: 'ocurrio un error' });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, conexionBD_1.connect)();
            const marcas = yield pool.query('DELETE FROM marcas WHERE CodigoMarca=?', [id]);
            res.json({ message: 'La marca fue eliminado' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let datos = req.body.encargados;
                console.log("para modificar " + datos);
                const idencargado = datos.idencargado;
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula;
                const carpeta = datos.carpeta;
                const values = { idencargado, nombre, apellido, cedula, carpeta };
                console.log(values);
                const conexion = yield (0, conexionBD_1.connect)();
                try {
                    const encargado = yield conexion.query('UPDATE encargados SET ? WHERE idencargado = ?', [values, idencargado]);
                    // const encargado = await conexion.query("SELECT * FROM encargados ")
                    conexion.end();
                    res.status(200).json(encargado);
                }
                catch (error) {
                    conexion.end();
                    res.status(500).json({ text: 'ocurrio un error' });
                }
            }
            catch (error) {
                res.status(404).json({ text: 'ocurrio un error' });
                console.log('error' + error);
            }
        });
    }
}
exports.encargadoControlador = new EncargadoControlador();
