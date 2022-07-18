import { Router } from 'express';
import { agendamientoControl } from '../../controlador/referenciales/agendamiento';

class AgendamientoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.post('/crear/',agendamientoControl.guardarAgenda);
       this.router.post('/ver/',agendamientoControl.verAgenda);
       this.router.put('/anular/',agendamientoControl.anularAgenda);
   }
}

const agendamientoRutas = new AgendamientoRutas();
 export default agendamientoRutas.router;