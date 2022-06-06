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
exports.medidaControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class UmedidaControl {
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = req.body.CodigoUnidad;
            const conn = yield (0, conexionBD_1.connect)();
            const datos = yield conn.query('SELECT * FROM datos WHERE CodigoUnidad=?', [codigo]);
            if (datos.length > 0) {
                conn.end();
                return res.json(datos[0]);
            }
            res.status(404).json({ text: 'el docente no existe' });
            conn.end();
        });
    }
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = yield conn.query('SELECT * FROM unidadmedida');
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
                const codigo = yield conn.query('SELECT MAX(CodigoUnidad)+1 AS CodigoUnidad FROM unidadmedida');
                JSON.stringify(codigo);
                const CodigoUnidad = codigo[0].CodigoUnidad;
                console.log(CodigoUnidad);
                const Descripcion = req.body.Descripcion.toUpperCase();
                const Simbolo = req.body.Simbolo.toUpperCase();
                ;
                const values = { CodigoUnidad, Descripcion, Simbolo };
                yield conn.query('INSERT INTO unidadmedida  SET ?', values);
                conn.end();
                res.status(200).json({ message: "la unidad de medida fue guardada" });
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
                const codigo = req.body.CodigoUnidad;
                const descripcion = req.body.Descripcion.toUpperCase();
                const Simbolo = req.body.Simbolo.toUpperCase();
                const values = { descripcion, Simbolo };
                console.log(values);
                yield conn.query('UPDATE unidadmedida SET ? WHERE CodigoUnidad = ?', [values, codigo]);
                conn.end();
                res.status(200).json({ message: "la unidad de medida fue modificada" });
            }
            catch (error) {
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
}
exports.medidaControl = new UmedidaControl();
