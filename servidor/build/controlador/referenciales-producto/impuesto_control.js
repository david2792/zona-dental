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
exports.impuestoControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ImpuestoControl {
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = req.body.CodigImpuesto;
            const conn = yield (0, conexionBD_1.connect)();
            const datos = yield conn.query('SELECT * FROM tipoimpuesto WHERE CodigImpuesto=?', [codigo]);
            if (datos.length > 0) {
                conn.end();
                return res.json(datos[0]);
            }
            res.status(404).json({ text: 'el impuesto no existe' });
            conn.end();
        });
    }
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = yield conn.query('SELECT * FROM tipoimpuesto');
                if (datos.length > 0) {
                    conn.end();
                    return res.json(datos);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'la unidad de medida no existe' });
                conn.end();
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const codigo = yield conn.query('SELECT MAX(CodigImpuesto)+1 AS CodigImpuesto FROM tipoimpuesto');
                JSON.stringify(codigo);
                const CodigImpuesto = codigo[0].CodigImpuesto;
                const Descripcion = req.body.Descripcion.toUpperCase();
                const Porcentaje = req.body.Porcentaje;
                const DividirPor = req.body.DividirPor;
                const values = { CodigImpuesto, Descripcion, Porcentaje, DividirPor };
                yield conn.query('INSERT INTO tipoimpuesto  SET ?', values);
                conn.end();
                res.status(200).json({ message: "el impuesto fue guardado" });
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
                const codigo = req.body.CodigImpuesto;
                const Descripcion = req.body.Descripcion.toUpperCase();
                const Porcentaje = req.body.Porcentaje;
                const DividirPor = req.body.DividirPor;
                const values = { Descripcion, Porcentaje, DividirPor };
                console.log(values);
                yield conn.query('UPDATE tipoimpuesto SET ? WHERE CodigImpuesto = ?', [values, codigo]);
                conn.end();
                res.status(200).json({ message: "el impuesto fue modificado" });
            }
            catch (error) {
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
}
exports.impuestoControl = new ImpuestoControl();
