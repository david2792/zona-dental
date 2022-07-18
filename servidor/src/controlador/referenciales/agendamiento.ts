import { query, Request, Response} from 'express';
import moment from 'moment';
import  { connect }  from '../../conexion/conexionBD';


class AgendamientoControl
{
  
  public async verAgenda (req:Request,res:Response):Promise<any>{
   // const { ci }= req.params;
    
   const conn = await connect();
    
  try {
   
    const fecha = moment(req.body.fecha).format('YYYY-MM-DD')
    const iddoctores = req.body.doctor
    const padron =  await conn.query('SELECT * FROM vagenda WHERE estado = 1 AND fecha=? AND iddoctores=?',[fecha,iddoctores]);
    if(padron.length > 0){
      conn.end()
      return res.json(padron);
    }else{
     
      return res.json(padron);
    }
  } catch (error) {
    console.log(error)
   // res.status(404).json({text:'el registro no existe'});
    conn.end()
  }
  } 

  public async guardarAgenda(req: Request, res: Response): Promise<void> 
  {
    console.log("hola ")
    const conn = await connect();
    try {

      const datos = req.body
      
      const codigo = await conn.query('SELECT MAX(idagendamientos) AS idagendamientos FROM agendamientos')
      JSON.stringify(codigo);
      const codigoagendamiento = codigo[0].idagendamientos;
      const idagendamientos = codigoagendamiento+1
      const fecha = moment(req.body.fecha).format('YYYY-MM-DD')
      const hora = req.body.hora
      const observacion = req.body.observacion
      const idpersonas = req.body.persona
      const iddoctores = req.body.doctor
      const estado = 1
      const valores = {
        idagendamientos,fecha,hora,observacion,idpersonas,iddoctores,estado
      }
      console.log(valores)
      await conn.query('INSERT INTO agendamientos  SET ?', valores);
      conn.end()
      res.status(200).json({ message: "registro guardado" });
    } catch (error) {
      console.log(error)
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
  }
  
  public async anularAgenda(req: Request, res: Response): Promise<void> 
  {
    console.log(req.body[0])
    const conn = await connect();
    try {
      const idagendamientos = req.body[0]
      const estado =0
      console.log(idagendamientos)
      // estado 0 = anulado
      // estado 1 = pendiente
      const values = estado ;
      console.log(values)
      await conn.query('UPDATE agendamientos SET estado=? WHERE idagendamientos = ?', [estado, idagendamientos]);
      conn.end()
      res.status(200).json({ message: "la datos fueron modificados" });
    } catch (error) {
      console.log(error)
      conn.end()
    }
    
  }

  
}


export const agendamientoControl = new AgendamientoControl();