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
    const persona =  await conn.query('SELECT * FROM personas');
    if(persona.length > 0)
    {
      conn.end()
      return res.json(persona);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'las personas no existe'});
    conn.end()
  }
  } 
  // se crea el metdo para obtener pacientes
  public async listarPaciente (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const persona =  await conn.query('SELECT * FROM vpacientes');
    if(persona.length > 0)
    {
      conn.end()
      return res.json(persona);
    }
  } 
  catch (error) 
  {
    console.log(error)
    res.status(404).json({text:'El paciente no existe'});
    conn.end()
  }
  } 
  // se cierre

  // parte de doctores crear, modificar y listar
  public async listarDoctores (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const doctor =  await conn.query('SELECT iddoctores, nombre, apellido, CONCAT(nombre,apellido) AS valor  FROM doctores');
    if(doctor.length > 0)
    {
      conn.end()
      return res.json(doctor);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'los datos no existe'});
    conn.end()
  }
  } 

  public async guardarDoctor(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const datos = req.body
      console.log(datos)
      const codigo = await conn.query('SELECT MAX(iddoctores) AS iddoctores FROM doctores')
      JSON.stringify(codigo);
      const codigodoctor = codigo[0].iddoctores;
      const iddoctores = codigodoctor+1
      const nombre = req.body.nombre.toUpperCase()
      const apellido = req.body.apellido.toUpperCase()
      const cedula = req.body.cedula
      const telefono = req.body.telefono
      const numero_matricula = req.body.matricula.toUpperCase()
    
      const valores = {
        iddoctores,numero_matricula,nombre,apellido,cedula,telefono,
      }
      console.log(valores)
      await conn.query('INSERT INTO doctores  SET ?', valores);
      conn.end()
      res.status(200).json({ message: "registro guardado" });
    } catch (error) {
      console.log(error)
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }

   
    
  }

  // fin doctores
  public async listarUnPaciente (req:Request,res:Response):Promise<any>{
    const { codigo }= req.params;
    console.log(codigo)
    const conn = await connect();
    const padron =  await conn.query('SELECT * FROM vpacientes WHERE idpersonas=?',[codigo]);
    if(padron.length > 0){
      console.log(padron[0].fecha_nacimiento)
      const fecha =moment(padron[0].fecha_nacimiento).format('YYYY-MM-DD')
      padron[0].fecha_nacimiento = fecha
      conn.end()
      return res.json(padron[0]);
    }
    res.status(404).json({text:'el docente no existe'});
    conn.end()
  
  }
  // pacientes
  // ***************************************
  public async crear(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const datos = req.body
      console.log(datos)
      const codigo = await conn.query('SELECT MAX(idpersonas) AS idpersonas FROM personas')
      JSON.stringify(codigo);
      const codigopersona = codigo[0].idpersonas;
      const idpersonas = codigopersona+1
      // recuperar los codigos
      const genero= await conn.query('SELECT idgenero FROM generos WHERE descripcion =?',req.body.idgenero);
      const profesion= await conn.query('SELECT idprofesion FROM profesion WHERE descripcion =?',req.body.idprofesion);
      const estado= await conn.query('SELECT idestadociviles FROM estadociviles WHERE descripcion =?',req.body.idestado);
      const ciudad= await conn.query('SELECT idciudad FROM ciudad WHERE nombre =?',req.body.idciudad);
    // se carga los valores
      const nombre = req.body.nombre.toUpperCase()
      const apellido = req.body.apellido.toUpperCase()
      var ci = req.body.cedula
      if(ci==null){
        ci=idpersonas
      }
      var ruc = req.body.ruc
      if(ruc==null){
        ruc=idpersonas
      }
      const nacimiento = req.body.fecha
      const fecha_nacimiento =  moment(nacimiento).format('YYYY-MM-DD')
      var correo = req.body.correo
      if(correo==null){
        correo="SIN INFORMACION"
      }
      const telefono = req.body.telefono
      var whatsapp = req.body.whatsapp
      if(whatsapp==null){
        whatsapp=telefono
      }
      var direccion = req.body.direccion
      if(direccion==null){
        direccion="SIN INFORMACION"
      }else{
          direccion.toUpperCase()
      }
      var gruposanguineo = req.body.grupo_sanguineo
      if(gruposanguineo==null){
        gruposanguineo="SIN INFORMACION"
      }else{
       gruposanguineo.toUpperCase()
      }
      var telefono_emergencia= req.body.emergencia
      if(telefono_emergencia==null){
        telefono_emergencia=telefono
      }
      var tutor_legal = req.body.tutor
      if(tutor_legal==null){
        tutor_legal="SIN INFORMACION"
      }else{
        tutor_legal.toUpperCase()
      }
      const iddoctores = req.body.iddoctores
      console.log(genero)
      const idgenero = genero[0].idgenero
      const idprofesion = profesion[0].idprofesion
      const idestadociviles = estado[0].idestadociviles
      const idciudad = ciudad[0].idciudad
      // valores en un array
      const valores = {
        idpersonas,nombre,apellido,ci,ruc,fecha_nacimiento,correo,telefono,whatsapp,direccion,idciudad,idgenero,idprofesion,idestadociviles,gruposanguineo,telefono_emergencia,tutor_legal,iddoctores
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

  public async modificarPaciente(req: Request, res: Response): Promise<void> 
  {
    const conn = await connect();
    try {
      const { codigo }= req.params;
       // recuperar los codigos
       const genero= await conn.query('SELECT idgenero FROM generos WHERE descripcion =?',req.body.idgenero);
       const profesion= await conn.query('SELECT idprofesion FROM profesion WHERE descripcion =?',req.body.idprofesion);
       const estado= await conn.query('SELECT idestadociviles FROM estadociviles WHERE descripcion =?',req.body.idestado);
       const ciudad= await conn.query('SELECT idciudad FROM ciudad WHERE nombre =?',req.body.idciudad);
     // se carga los valores
       const nombre = req.body.nombre.toUpperCase()
       const apellido = req.body.apellido.toUpperCase()
       const ci = req.body.cedula
       const ruc = req.body.ruc
       const nacimiento = req.body.fecha
       const fecha_nacimiento = moment(nacimiento).format('YYYY-MM-DD')
       const correo = req.body.correo
       const telefono = req.body.telefono
       const whatsapp = req.body.whatsapp
       const direccion = req.body.direccion
       var gruposanguineo = req.body.grupo_sanguineo
       if(gruposanguineo==null){
         gruposanguineo="SIN INFORMACION"
       }else{
         gruposanguineo.toUpperCase()
       }
       const telefono_emergencia= req.body.emergencia
       var tutor_legal = req.body.tutor
       if(tutor_legal==null){
         tutor_legal="SIN INFORMACION"
       }else{
         tutor_legal.toUpperCase()
       }
       const iddoctores = req.body.iddoctores
       console.log(genero)
       const idgenero = genero[0].idgenero
       const idprofesion = profesion[0].idprofesion
       const idestadociviles = estado[0].idestadociviles
       const idciudad = ciudad[0].idciudad
       // valores en un array
       const valores = {
         nombre,apellido,ci,ruc,fecha_nacimiento,correo,telefono,whatsapp,direccion,idciudad,idgenero,idprofesion,idestadociviles,gruposanguineo,telefono_emergencia,tutor_legal,iddoctores
       }
       console.log(valores)
      await conn.query('UPDATE personas SET ? WHERE idpersonas = ?', [valores, codigo]);
      conn.end()
      res.status(200).json({ message: "la persona fue modificada" });
    } catch (error) {
      res.status(404).json({text:'error al guardar los datos'});
      console.log(error)
      conn.end()
    }
    
  }

  
}


export const personaControl = new PersonaControl();
