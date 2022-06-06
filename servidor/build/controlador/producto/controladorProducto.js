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
exports.productoControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ProductoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const cliente = yield conn.query("SELECT * FROM vproductos ");
                conn.end();
                res.json(cliente);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    listarVotantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const cliente = yield conn.query("SELECT * FROM votantes WHERE voto= 0");
                conn.end();
                res.json(cliente);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const conn = yield (0, conexionBD_1.connect)();
            const empresa = yield conn.query('SELECT * FROM votantes WHERE Cedula=?', [id]);
            if (empresa.length > 0) {
                return res.json(empresa[0]);
            }
            conn.end();
            res.status(404).json({ text: 'el cliente no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                let datos = req.body.clientes;
                console.log(datos);
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula;
                //  const direccion = datos.direccion;
                const celular = datos.celular;
                //   const ciudad = datos.ciudad;
                const idencargado = datos.idencargado;
                const usuariocreador = "1";
                const values = { nombre, apellido, cedula, celular, idencargado, usuariocreador };
                console.log(values);
                const resultado = yield conn.query("INSERT INTO votantes SET ? ", values);
                conn.end();
                res.json(resultado);
            }
            catch (error) {
                conn.end();
                console.log('error' + error);
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
            const pool = yield (0, conexionBD_1.connect)();
            try {
                let datos = req.body.clientes;
                console.log(datos);
                const idvotante = datos.idvotante;
                const nombre = datos.nombre;
                const apellido = datos.apellido;
                const cedula = datos.cedula;
                //  const direccion = datos.direccion;
                const celular = datos.celular;
                //   const ciudad = datos.ciudad;
                const idencargado = datos.idencargado;
                const usuariocreador = "1";
                const values = { nombre, apellido, cedula, celular, idencargado, usuariocreador };
                console.log(values);
                //  const pool = await connect();
                const categoria = yield pool.query('UPDATE votantes SET ? WHERE idvotante = ?', [values, idvotante]);
                res.json({ message: 'El cliente fue actualizada' });
                pool.end();
            }
            catch (error) {
                pool.end();
                res.status(404).json({ text: 'error' });
                console.log('error' + error);
            }
        });
    }
    voto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, conexionBD_1.connect)();
            try {
                let datos = req.body.clientes;
                const cedula = datos.cedula;
                console.log(datos);
                const voto = "VOTO CONFIRMADO"; // uno significa que voto y dos que se anulo el voto
                const confirmarVoto = yield pool.query('UPDATE votantes SET voto=? WHERE cedula = ?', [voto, cedula]);
                res.json({ message: 'El cliente fue actualizada' });
                pool.end();
            }
            catch (error) {
                pool.end();
                res.status(404).json({ text: 'error' });
                console.log('error' + error);
            }
        });
    }
    Buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const { id } = req.params;
                console.log(id);
                const cliente = yield conn.query("SELECT * FROM votantes WHERE Cedula  = ?", id);
                conn.end();
                res.json(cliente);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
}
exports.productoControlador = new ProductoControlador();
