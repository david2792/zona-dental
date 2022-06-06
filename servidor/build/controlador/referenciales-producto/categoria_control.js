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
exports.categoriaControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class CategoriaControl {
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
                const categoria = yield conn.query('SELECT * FROM categorias');
                if (categoria.length > 0) {
                    conn.end();
                    return res.json(categoria);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'las categorias no existe' });
                conn.end();
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                console.log("servidor");
                const codigo = yield conn.query('SELECT MAX(CodigoCategoria)+1 AS CodigoCategoria FROM categorias');
                JSON.stringify(codigo);
                const CodigoCategoria = codigo[0].CodigoCategoria;
                console.log("servidor" + CodigoCategoria);
                let datos = req.body.categorias;
                const Descripcion = datos.Descripcion.toUpperCase();
                ;
                const values = { CodigoCategoria, Descripcion };
                console.log(values);
                yield conn.query('INSERT INTO categorias  SET ?', values);
                conn.end();
                res.status(200).json({ message: "la categoria fue guardada" });
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
exports.categoriaControl = new CategoriaControl();
