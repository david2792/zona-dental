import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class ProfesionControl
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

  public async listarTodoProfesion (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const profesion =  await conn.query('SELECT * FROM profesion');
    if(profesion.length > 0)
    {
      conn.end()
      return res.json(profesion);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'la ciudad no existe'});
    conn.end()
  }
  } 

  
}


export const profesionControl = new ProfesionControl();