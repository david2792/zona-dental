import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class MarcaControl
{

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const datos =  await conn.query('SELECT * FROM marcas');
    if(datos.length > 0)
    {
      conn.end()
      return res.json(datos);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'las marca no existe'});
    conn.end()
  }
  } 

  public async crear(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const codigo = await conn.query('SELECT MAX(CodigoMarca)+1 AS CodigoMarca FROM marcas')
      JSON.stringify(codigo);
      const CodigoMarca = codigo[0].CodigoMarca;
      console.log(CodigoMarca);
      const Descripcion = req.body.Descripcion.toUpperCase();;
      const values = { CodigoMarca, Descripcion };
      await conn.query('INSERT INTO marcas  SET ?', values);
      conn.end()
      res.status(200).json({ message: "la marca fue guardada" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  public async modificar(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const codigo = req.body.CodigoMarca;
      const descripcion = req.body.Descripcion.toUpperCase();;
      const values = { descripcion };
      console.log(values)
      await conn.query('UPDATE marcas SET ? WHERE CodigoMarca = ?', [values, codigo]);
      conn.end()
      res.status(200).json({ message: "la marca fue modificada" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  
}


export const marcaControl = new MarcaControl();