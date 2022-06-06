import { token } from 'morgan';
import jwt from 'jsonwebtoken'
import { Request, Response, response } from 'express';
import { connect } from '../../conexion/conexionBD';

class UsuarioControlador {
    /**
     * acceso al sistema
     */
    public async acceso(req: Request, res: Response): Promise<void> {
        var SECRET = "SECRETO_PARA_ENCRIPTACION"
        const pool= await connect()
        try {
           
            const usuario = await pool.query('SELECT * FROM usuarios');
            JSON.stringify(usuario);
            console.log(usuario);
            const cod= usuario[0].CodigoUsuario;
            const usuarios = usuario[0].Usuario;
            const clave = usuario[0].Clave;
            const descripcion = usuario[0].descripcion;
            const nombre =usuario[0].Nombre+" "+usuario[0].Apellido
            const value = { usuarios, clave };
            const users = req.body.usuario;
            const pass = req.body.password;
            if (users == usuarios && pass == clave) {
                var tokenData = {
                    codigo:cod,
                    users: users,
                    pass: pass,
                    nombre:nombre,
                    descripcion:"ADMINISTRADOR"
                    
    // ANY DATA
                }
                console.log("bienvenido")
                // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                var token:string = jwt.sign(tokenData, 'Secret Password', {
                    expiresIn: "8h" // expires in 24 hours
                })
               // console.log(token)
               pool.end()
               console.log(tokenData)
                res.header('auth-token',token).json({token,tokenData})
            }else{
                pool.end()
                localStorage.clear();
            }


        } catch (error) {
            pool.end()
            res.status(404).json(error)
        }
    }

    public async verificar(req: Request, res: Response): Promise<void> {
        var SECRET = "Secret Password"
        var token = req.headers['authorization']
        if (!token) {
            res.status(401).send({
                error: "Es necesario el token de autenticación"
            })
            return
        }
        token = token.replace('Bearer ', '')

        jwt.verify(token, 'Secret Password', function(err, user) {
          if (err) {
            res.status(401).send({
              error: 'Token inválido'
            })
          } else {
            res.send({
              message: 'Awwwww yeah!!!!'
            });
          }
        });
    }
}

export const usuarioControlador = new UsuarioControlador();