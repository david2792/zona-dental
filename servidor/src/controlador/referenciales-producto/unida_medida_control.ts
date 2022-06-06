import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class UmedidaControl
{
  
  public async listarUno (req:Request,res:Response):Promise<any>{
    const codigo= req.body.CodigoUnidad;
    const conn = await connect();
    const datos =  await conn.query('SELECT * FROM datos WHERE CodigoUnidad=?',[codigo]);
    if(datos.length > 0){
      conn.end()
      return res.json(datos[0]);
    }
    res.status(404).json({text:'el docente no existe'});
    conn.end()
  
  } 

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const datos =  await conn.query('SELECT * FROM unidadmedida');
    if(datos.length > 0)
    {
      conn.end()
      return res.json(datos);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'la unidad de medida no existe'});
    conn.end()
  }
  } 

  public async crear(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const codigo = await conn.query('SELECT MAX(CodigoUnidad)+1 AS CodigoUnidad FROM unidadmedida')
      JSON.stringify(codigo);
      const CodigoUnidad = codigo[0].CodigoUnidad;
      console.log(CodigoUnidad);
      const Descripcion = req.body.Descripcion.toUpperCase();
      const Simbolo = req.body.Simbolo.toUpperCase();;
      const values = { CodigoUnidad, Descripcion , Simbolo};
      await conn.query('INSERT INTO unidadmedida  SET ?', values);
      conn.end()
      res.status(200).json({ message: "la unidad de medida fue guardada" });
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
      const codigo = req.body.CodigoUnidad;
      const descripcion = req.body.Descripcion.toUpperCase();
      const Simbolo = req.body.Simbolo.toUpperCase();
      const values = { descripcion,Simbolo};
      console.log(values)
      await conn.query('UPDATE unidadmedida SET ? WHERE CodigoUnidad = ?', [values, codigo]);
      conn.end()
      res.status(200).json({ message: "la unidad de medida fue modificada" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  
}


export const medidaControl = new UmedidaControl();