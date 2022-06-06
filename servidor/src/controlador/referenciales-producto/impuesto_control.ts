import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class ImpuestoControl
{
  
  public async listarUno (req:Request,res:Response):Promise<any>{
    const codigo= req.body.CodigImpuesto;
    const conn = await connect();
    const datos =  await conn.query('SELECT * FROM tipoimpuesto WHERE CodigImpuesto=?',[codigo]);
    if(datos.length > 0){
      conn.end()
      return res.json(datos[0]);
    }
    res.status(404).json({text:'el impuesto no existe'});
    conn.end()
  
  } 

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const datos =  await conn.query('SELECT * FROM tipoimpuesto');
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
      const codigo = await conn.query('SELECT MAX(CodigImpuesto)+1 AS CodigImpuesto FROM tipoimpuesto')
      JSON.stringify(codigo);
      const CodigImpuesto = codigo[0].CodigImpuesto;
      const Descripcion = req.body.Descripcion.toUpperCase();
      const Porcentaje = req.body.Porcentaje;
      const DividirPor = req.body.DividirPor;
      const values = { CodigImpuesto, Descripcion,Porcentaje,DividirPor};
      await conn.query('INSERT INTO tipoimpuesto  SET ?', values);
      conn.end()
      res.status(200).json({ message: "el impuesto fue guardado" });
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
      const codigo = req.body.CodigImpuesto;
      const Descripcion = req.body.Descripcion.toUpperCase();
      const Porcentaje = req.body.Porcentaje;
      const DividirPor = req.body.DividirPor;
      const values = { Descripcion,Porcentaje,DividirPor};
      console.log(values)
      await conn.query('UPDATE tipoimpuesto SET ? WHERE CodigImpuesto = ?', [values, codigo]);
      conn.end()
      res.status(200).json({ message: "el impuesto fue modificado" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  
}


export const impuestoControl = new ImpuestoControl();