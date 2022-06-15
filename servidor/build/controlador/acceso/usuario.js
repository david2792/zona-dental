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
                const users = req.body.usuario;
                const pass = req.body.contraseña;
                const datosusuarios = yield pool.query('SELECT * FROM usuarios WHERE usuario=? AND contraseña=?', [users, pass]);
                JSON.stringify(datosusuarios);
                const cod = datosusuarios[0].idusuarios;
                const usuario = datosusuarios[0].usuario;
                console.log(datosusuarios);
                const clave = datosusuarios[0].contraseña;
                const descripcion = datosusuarios[0].descripcion;
                const nombre = datosusuarios[0].nombre + " " + datosusuarios[0].apellido;
                const value = { usuario, clave };
                console.log(pass);
                // if (users == usuario && pass ==  clave) {
                var tokenData = {
                    codigo: cod,
                    users: users,
                    pass: pass,
                    nombre: nombre,
                    descripcion: descripcion
                    // ANY DATA
                };
                console.log("bienvenido");
                // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                var token = jsonwebtoken_1.default.sign(tokenData, 'Secret Password', {
                    expiresIn: "8h" // expires in 24 hours
                });
                // console.log(token)
                pool.end();
                console.log(({ token, tokenData }));
                res.header('auth-token', token).json({ token, tokenData });
                //res.json(tokenData)
                // }else{
                //     pool.end()
                //     localStorage.clear();
                // }
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
