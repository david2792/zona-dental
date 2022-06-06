import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class DepositoControl
{

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const datos =  await conn.query('SELECT * FROM depositos');
    if(datos.length > 0)
    {
      conn.end()
      return res.json(datos);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'el deposito no existe'});
    conn.end()
  }
  } 
  
}


export const depositoControl = new DepositoControl();