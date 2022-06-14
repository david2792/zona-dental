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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
const moment_1 = __importDefault(require("moment"));
class PersonaControl {
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ci } = req.params;
            const conn = yield (0, conexionBD_1.connect)();
            const padron = yield conn.query('SELECT * FROM datos WHERE CEDULA=?', [ci]);
            if (padron.length > 0) {
                conn.end();
                return res.json(padron[0]);
            }
            res.status(404).json({ text: 'el docente no existe' });
            conn.end();
        });
    }
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const persona = yield conn.query('SELECT * FROM vpersonas');
                if (persona.length > 0) {
                    conn.end();
                    return res.json(persona);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'las personas no existe' });
                conn.end();
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = req.body;
                console.log(datos);
                const codigo = yield conn.query('SELECT MAX(idpersonas) AS idpersonas FROM personas');
                JSON.stringify(codigo);
                const codigopersona = codigo[0].idpersonas;
                const idpersonas = codigopersona + 1;
                // recuperar los codigos
                const genero = yield conn.query('SELECT idgenero FROM generos WHERE descripcion =?', req.body.idgenero);
                const profesion = yield conn.query('SELECT idprofesion FROM profesion WHERE descripcion =?', req.body.idprofesion);
                const estado = yield conn.query('SELECT idestadociviles FROM estadociviles WHERE descripcion =?', req.body.idestado);
                const ciudad = yield conn.query('SELECT idciudad FROM ciudad WHERE nombre =?', req.body.idciudad);
                // se carga los valores
                const nombre = req.body.nombre;
                const apellido = req.body.apellido;
                const ci = req.body.cedula;
                const ruc = req.body.ruc;
                const nacimiento = req.body.fecha;
                const fecha_nacimiento = (0, moment_1.default)(nacimiento).format('DD-MM-YYYY');
                const correo = req.body.correo;
                const telefono = req.body.telefono;
                const whatsapp = req.body.whatsapp;
                const direccion = req.body.telefono;
                console.log(genero);
                const idgenero = genero[0].idgenero;
                const idprofesion = profesion[0].idprofesion;
                const idestadociviles = estado[0].idestadociviles;
                const idciudad = ciudad[0].idciudad;
                // valores en un array
                const valores = {
                    idpersonas, nombre, apellido, ci, ruc, fecha_nacimiento, correo, telefono, whatsapp, direccion, idciudad, idgenero, idprofesion, idestadociviles
                };
                yield conn.query('INSERT INTO personas  SET ?', valores);
                conn.end();
                res.status(200).json({ message: "la categoria fue guardada" });
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                let datos = req.body.categorias;
                const codigo = datos.CodigoCategoria;
                const descripcion = datos.Descripcion.toUpperCase();
                ;
                const values = { descripcion };
                console.log(values);
                yield conn.query('UPDATE categorias SET ? WHERE CodigoCategoria = ?', [values, codigo]);
                conn.end();
                res.status(200).json({ message: "la categoria fue modificada" });
            }
            catch (error) {
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
}
exports.personaControl = new PersonaControl();
