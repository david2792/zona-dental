import { Router } from 'express';
import { generoControl } from '../../controlador/referenciales/genero';

class GeneroRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',generoControl.listarTodoGenero);
      
       

      
   }
}

const generoRutas = new GeneroRutas();
 export default generoRutas.router;