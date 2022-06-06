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
exports.marcaControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class MarcaControl {
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = yield conn.query('SELECT * FROM marcas');
                if (datos.length > 0) {
                    conn.end();
                    return res.json(datos);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'las marca no existe' });
                conn.end();
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const codigo = yield conn.query('SELECT MAX(CodigoMarca)+1 AS CodigoMarca FROM marcas');
                JSON.stringify(codigo);
                const CodigoMarca = codigo[0].CodigoMarca;
                console.log(CodigoMarca);
                const Descripcion = req.body.Descripcion.toUpperCase();
                ;
                const values = { CodigoMarca, Descripcion };
                yield conn.query('INSERT INTO marcas  SET ?', values);
                conn.end();
                res.status(200).json({ message: "la marca fue guardada" });
            }
            catch (error) {
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const codigo = req.body.CodigoMarca;
                const descripcion = req.body.Descripcion.toUpperCase();
                ;
                const values = { descripcion };
                console.log(values);
                yield conn.query('UPDATE marcas SET ? WHERE CodigoMarca = ?', [values, codigo]);
                conn.end();
                res.status(200).json({ message: "la marca fue modificada" });
            }
            catch (error) {
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
}
exports.marcaControl = new MarcaControl();
