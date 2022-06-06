import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class GeneroControl
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

  public async listarTodoGenero (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const generos =  await conn.query('SELECT * FROM generos');
    if(generos.length > 0)
    {
      conn.end()
      return res.json(generos);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'la ciudad no existe'});
    conn.end()
  }
  } 

  
}


export const generoControl = new GeneroControl();