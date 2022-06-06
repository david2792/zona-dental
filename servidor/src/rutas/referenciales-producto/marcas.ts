import { Router } from 'express';
import { marcaControl } from '../../controlador/referenciales-producto/marca_control';

class MarcaRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',marcaControl.listarTodo);
       this.router.post('/crear/',marcaControl.crear);
       this.router.put('/modificar/',marcaControl.modificar);
       

      
   }
}

const marcaRutas = new MarcaRutas();
 export default marcaRutas.router;