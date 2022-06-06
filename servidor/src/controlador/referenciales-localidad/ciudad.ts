import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class CiudadControl
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

  public async listarTodoCiudad (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const ciudad =  await conn.query('SELECT * FROM ciudad');
    if(ciudad.length > 0)
    {
      conn.end()
      return res.json(ciudad);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'la ciudad no existe'});
    conn.end()
  }
  } 

  public async crear(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      console.log("servidor")
      const codigo = await conn.query('SELECT MAX(CodigoCategoria)+1 AS CodigoCategoria FROM categorias')
      JSON.stringify(codigo);
      const CodigoCategoria = codigo[0].CodigoCategoria;
      console.log("servidor"+CodigoCategoria)
      let datos=req.body.categorias;
      const Descripcion = datos.Descripcion.toUpperCase();;
      const values = { CodigoCategoria, Descripcion };
      console.log(values)
      await conn.query('INSERT INTO categorias  SET ?', values);
      conn.end()
      res.status(200).json({ message: "la categoria fue guardada" });
    } catch (error) {
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


export const ciudadControl = new CiudadControl();