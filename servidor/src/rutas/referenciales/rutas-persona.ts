import { Router } from 'express';
import { personaControl } from '../../controlador/referenciales/persona';
import {pacienteControl} from '../../controlador/referenciales-personas/pacientes'
class Persona_Rutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.post('/crear/',personaControl.crear);
       this.router.get('/listar',personaControl.listarTodo);
       this.router.post('/crearpaciente',pacienteControl.crear);  
    //    rutas de pacientes
       this.router.get('/listar-paciente',personaControl.listarPaciente);
   }
}

const personaRutas = new Persona_Rutas();
 export default personaRutas.router;