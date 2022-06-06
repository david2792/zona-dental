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
exports.clienteControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ClienteControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const cliente = yield conn.query("SELECT * FROM votantes ");
                conn.end();
                res.json(cliente);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    listartOTAL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=?", [voto]);
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
                conn.end();
                res.json(cliente);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    CantidadVotantesNacio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local COL.NAC. DR. PEDRO P. PEÑA";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  capillita
    CantidadVotantesCapillita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC. CAPILLITA";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  aguapety
    CantidadVotantesAguapety(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC. AGUAPETY/ESC. MANUEL O.GUERRERO";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  enrique
    CantidadVotantesEnrique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local COL.NAC. ENRIQUE S. LOPEZ";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  san roque
    CantidadVotantesSanRoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local COL. SAN ROQUE G. DE SANTACRUZ";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  San antonio
    CantidadVotantesSanAntonio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local COL. DE SAN ANTONIO";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log("san" + cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  Cnel Oviedo
    CantidadVotantesCnelOviedo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC. CNEL OVIEDO";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  Caballero Local ESC. WENSESLAA ESCALADA
    CantidadVotantesCaballero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC. N. 397 GRAL. B. CABALLERO  ";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  Caballero Local 
    CantidadVotantesWnsela(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC. WENSESLAA ESCALADA";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  Caballero Local 
    CantidadVotantesCalle1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC.CALLE 1 - COL.BLAS GARAY";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    //  Caballero Local    
    CantidadVotantesCalle2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC.CALLE 2 DE LA COL.B.GARAY";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
            }
            catch (error) {
                conn.end();
                console.log("ocurrio el siguiente error: " + error);
            }
        });
    }
    CantidadVotantesAlicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const voto = "VOTO CONFIRMADO";
                const local = "Local ESC.GDA.ALICIO PERALTA";
                const cliente = yield conn.query("SELECT COUNT(*) as cantidad FROM  votantes WHERE voto=? AND local = ?", [voto, local]);
                conn.end();
                res.json(cliente[0].cantidad);
                console.log(cliente[0].cantidad);
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
exports.clienteControlador = new ClienteControlador();
