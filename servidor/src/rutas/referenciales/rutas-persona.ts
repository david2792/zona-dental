import { Router } from 'express';
import { personaControl } from '../../controlador/referenciales/persona';

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
      
       

      
   }
}

const personaRutas = new Persona_Rutas();
 export default personaRutas.router;