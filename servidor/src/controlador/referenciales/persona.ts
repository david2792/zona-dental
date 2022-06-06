import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';
import moment from 'moment';

class PersonaControl
{
  
  public async listarUno (req:Request,res:Response):Promise<any>{
    const { ci }= req.params;
    const conn = await connect();
    const padron =  await conn.query('SELECT * FROM datos WHERE CEDULA=?',[ci]);
    if(padron.length > 0){
      conn.end()
      return res.json(padron[0]);
    }
    res.status(404).json({text:'el docente no existe'});
    conn.end()
  
  } 

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const categoria =  await conn.query('SELECT * FROM categorias');
    if(categoria.length > 0)
    {
      conn.end()
      return res.json(categoria);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'las categorias no existe'});
    conn.end()
  }
  } 

  public async crear(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const datos = req.body
      console.log(datos)
      const codigo = await conn.query('SELECT MAX(idpersonas)+1 AS idpersonas FROM personas')
      JSON.stringify(codigo);
      const codigopersona = codigo[0].idpersonas;
      const idpersonas = codigopersona+1
      // recuperar los codigos
      const genero= await conn.query('SELECT idgenero FROM generos WHERE descripcion =?',req.body.idgenero);
      const profesion= await conn.query('SELECT idprofesion FROM profesion WHERE descripcion =?',req.body.idprofesion);
      const estado= await conn.query('SELECT idestadociviles FROM estadociviles WHERE descripcion =?',req.body.idestado);
      const ciudad= await conn.query('SELECT idciudad FROM ciudad WHERE nombre =?',req.body.idciudad);
    // se carga los valores
      const nombre = req.body.nombre
      const apellido = req.body.apellido
      const ci = req.body.cedula
      const ruc = req.body.ruc
      const nacimiento = req.body.fecha
      const fecha_nacimiento = moment(nacimiento).format('DD-MM-YYYY')
      const correo = req.body.correo
      const telefono = req.body.telefono
      const whatsapp = req.body.whatsapp
      const direccion = req.body.telefono
      console.log(genero)
      const idgenero = genero[0].idgenero
      const idprofesion = profesion[0].idprofesion
      const idestadociviles = estado[0].idestadociviles
      const idciudad = ciudad[0].idciudad
      // valores en un array
      const valores = {
        idpersonas,nombre,apellido,ci,ruc,fecha_nacimiento,correo,telefono,whatsapp,direccion,idciudad,idgenero,idprofesion,idestadociviles
      }
      await conn.query('INSERT INTO personas  SET ?', valores);
      conn.end()
      res.status(200).json({ message: "la categoria fue guardada" });
    } catch (error) {
      console.log(error)
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }

   
    
  }

  public async modificar(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      let datos=req.body.categorias;
      const codigo = datos.CodigoCategoria;
      const descripcion = datos.Descripcion.toUpperCase();;
      const values = { descripcion };
      console.log(values)
      await conn.query('UPDATE categorias SET ? WHERE CodigoCategoria = ?', [values, codigo]);
      conn.end()
      res.status(200).json({ message: "la categoria fue modificada" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  
}


export const personaControl = new PersonaControl();
