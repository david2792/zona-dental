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
exports.profesionControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ProfesionControl {
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
    listarTodoProfesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const profesion = yield conn.query('SELECT * FROM profesion');
                if (profesion.length > 0) {
                    conn.end();
                    return res.json(profesion);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'la ciudad no existe' });
                conn.end();
            }
        });
    }
}
exports.profesionControl = new ProfesionControl();
