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
            const users = req.body.usuario;
            const pass = req.body.contraseña;
            const datosusuarios = await pool.query('SELECT * FROM usuarios WHERE usuario=? AND contraseña=?',[users, pass]);
            JSON.stringify(datosusuarios);
            const cod= datosusuarios[0].idusuarios;
            const usuario = datosusuarios[0].usuario;
            console.log(datosusuarios);
            const clave = datosusuarios[0].contraseña;
            const descripcion = datosusuarios[0].descripcion;
            const nombre =datosusuarios[0].nombre+" "+datosusuarios[0].apellido
            const value = { usuario,  clave };
            
            console.log(pass)
            // if (users == usuario && pass ==  clave) {
                var tokenData = {
                    codigo:cod,
                    users: users,
                    pass: pass,
                    nombre:nombre,
                    descripcion:descripcion
                    
    // ANY DATA
                }
                console.log(tokenData)
                // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                var token:string = jwt.sign(tokenData, 'Secret Password', {
              
                    expiresIn: "8h" // expires in 24 hours
                })
               // console.log(token)
               pool.end()
              console.log(({token,tokenData}))
                res.header('auth-token',token).json({token,tokenData})
                //res.json(tokenData)
            // }else{
                
            //     pool.end()
            //     localStorage.clear();
            // }


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