import { Router } from 'express';
import { depositoControl } from '../../controlador/referenciales-producto/desposito_control';

class DepositoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',depositoControl.listarTodo);
  
   }
}

const depositoRutas = new DepositoRutas();
 export default depositoRutas.router;