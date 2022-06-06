import { Router } from 'express';
import { ciudadControl } from '../../controlador/referenciales-localidad/ciudad';

class CiudadRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',ciudadControl.listarTodoCiudad);
      
       

      
   }
}

const ciudadRutas = new CiudadRutas();
 export default ciudadRutas.router;