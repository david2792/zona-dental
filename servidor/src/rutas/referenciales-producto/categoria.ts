import { Router } from 'express';
import { categoriaControl } from '../../controlador/referenciales-producto/categoria_control';

class CategoriaRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',categoriaControl.listarTodo);
       this.router.post('/crear',categoriaControl.crear);
       this.router.put('/modificar/',categoriaControl.modificar);
       

      
   }
}

const categoriaRutas = new CategoriaRutas();
 export default categoriaRutas.router;