import { Router } from 'express';
import { estado_Civil_Control } from '../../controlador/referenciales/estado_civil';

class Estado_Civil_Rutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',estado_Civil_Control.listarTodoCivil);
      
       

      
   }
}

const estado_Civil_Rutas = new Estado_Civil_Rutas();
 export default estado_Civil_Rutas.router;