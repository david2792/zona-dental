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
exports.depositoControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class DepositoControl {
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = yield conn.query('SELECT * FROM depositos');
                if (datos.length > 0) {
                    conn.end();
                    return res.json(datos);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'el deposito no existe' });
                conn.end();
            }
        });
    }
}
exports.depositoControl = new DepositoControl();
