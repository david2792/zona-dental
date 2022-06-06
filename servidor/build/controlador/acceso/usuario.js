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
exports.usuarioControlador = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conexionBD_1 = require("../../conexion/conexionBD");
class UsuarioControlador {
    /**
     * acceso al sistema
     */
    acceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SECRET = "SECRETO_PARA_ENCRIPTACION";
            const pool = yield (0, conexionBD_1.connect)();
            try {
                const usuario = yield pool.query('SELECT * FROM usuarios');
                JSON.stringify(usuario);
                console.log(usuario);
                const cod = usuario[0].CodigoUsuario;
                const usuarios = usuario[0].Usuario;
                const clave = usuario[0].Clave;
                const descripcion = usuario[0].descripcion;
                const nombre = usuario[0].Nombre + " " + usuario[0].Apellido;
                const value = { usuarios, clave };
                const users = req.body.usuario;
                const pass = req.body.password;
                if (users == usuarios && pass == clave) {
                    var tokenData = {
                        codigo: cod,
                        users: users,
                        pass: pass,
                        nombre: nombre,
                        descripcion: "ADMINISTRADOR"
                        // ANY DATA
                    };
                    console.log("bienvenido");
                    // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                    var token = jsonwebtoken_1.default.sign(tokenData, 'Secret Password', {
                        expiresIn: "8h" // expires in 24 hours
                    });
                    // console.log(token)
                    pool.end();
                    console.log(tokenData);
                    res.header('auth-token', token).json({ token, tokenData });
                }
                else {
                    pool.end();
                    localStorage.clear();
                }
            }
            catch (error) {
                pool.end();
                res.status(404).json(error);
            }
        });
    }
    verificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SECRET = "Secret Password";
            var token = req.headers['authorization'];
            if (!token) {
                res.status(401).send({
                    error: "Es necesario el token de autenticación"
                });
                return;
            }
            token = token.replace('Bearer ', '');
            jsonwebtoken_1.default.verify(token, 'Secret Password', function (err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido'
                    });
                }
                else {
                    res.send({
                        message: 'Awwwww yeah!!!!'
                    });
                }
            });
        });
    }
}
exports.usuarioControlador = new UsuarioControlador();
