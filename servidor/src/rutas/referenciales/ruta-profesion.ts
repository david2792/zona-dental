import { Router } from 'express';
import { profesionControl } from '../../controlador/referenciales/profesion';

class ProfesionRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',profesionControl.listarTodoProfesion);
      
       

      
   }
}

 const profesionRutas = new ProfesionRutas();
 export default profesionRutas.router