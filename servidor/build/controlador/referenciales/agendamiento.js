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
exports.agendamientoControl = void 0;
const moment_1 = __importDefault(require("moment"));
const conexionBD_1 = require("../../conexion/conexionBD");
class AgendamientoControl {
    verAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { ci }= req.params;
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const fecha = (0, moment_1.default)(req.body.fecha).format('YYYY-MM-DD');
                const iddoctores = req.body.doctor;
                const padron = yield conn.query('SELECT * FROM vagenda WHERE estado = 1 AND fecha=? AND iddoctores=?', [fecha, iddoctores]);
                if (padron.length > 0) {
                    conn.end();
                    return res.json(padron);
                }
                else {
                    return res.json(padron);
                }
            }
            catch (error) {
                console.log(error);
                // res.status(404).json({text:'el registro no existe'});
                conn.end();
            }
        });
    }
    guardarAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hola ");
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = req.body;
                const codigo = yield conn.query('SELECT MAX(idagendamientos) AS idagendamientos FROM agendamientos');
                JSON.stringify(codigo);
                const codigoagendamiento = codigo[0].idagendamientos;
                const idagendamientos = codigoagendamiento + 1;
                const fecha = (0, moment_1.default)(req.body.fecha).format('YYYY-MM-DD');
                const hora = req.body.hora;
                const observacion = req.body.observacion;
                const idpersonas = req.body.persona;
                const iddoctores = req.body.doctor;
                const estado = 1;
                const valores = {
                    idagendamientos, fecha, hora, observacion, idpersonas, iddoctores, estado
                };
                console.log(valores);
                yield conn.query('INSERT INTO agendamientos  SET ?', valores);
                conn.end();
                res.status(200).json({ message: "registro guardado" });
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
    anularAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body[0]);
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const idagendamientos = req.body[0];
                const estado = 0;
                console.log(idagendamientos);
                // estado 0 = anulado
                // estado 1 = pendiente
                const values = estado;
                console.log(values);
                yield conn.query('UPDATE agendamientos SET estado=? WHERE idagendamientos = ?', [estado, idagendamientos]);
                conn.end();
                res.status(200).json({ message: "la datos fueron modificados" });
            }
            catch (error) {
                console.log(error);
                conn.end();
            }
        });
    }
}
exports.agendamientoControl = new AgendamientoControl();
