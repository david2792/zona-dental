import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class PacienteControl
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
    const categoria =  await conn.query('SELECT * FROM pacientes');
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
      const codigo = await conn.query('SELECT MAX(idpaciente) AS idpaciente FROM paciente')
      JSON.stringify(codigo);
      const   codigopersona = codigo[0].idpaciente;
      const idpaciente = codigopersona+1
      const idpersonas = req.body.idpersonas
      console.log(idpaciente)
      const gruposanguineo = req.body.grupo
      const telefono_emergencia = req.body.telefono
      const odontologo = req.body.odontologo
      const tutor_legal = req.body.legal
  
      const valores = {
        idpersonas,idpaciente,gruposanguineo,telefono_emergencia,odontologo,tutor_legal
      }
      await conn.query('INSERT INTO paciente  SET ?', valores);
      conn.end()
      res.status(200).json({ message: "el paciente fue guardado" });
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


export const pacienteControl = new PacienteControl();