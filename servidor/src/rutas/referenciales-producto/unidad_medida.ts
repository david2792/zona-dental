import { Router } from 'express';
import { medidaControl } from '../../controlador/referenciales-producto/unida_medida_control';

class MedidaRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',medidaControl.listarTodo);
       this.router.post('/crear/',medidaControl.crear);
       this.router.put('/modificar/',medidaControl.modificar);
       

      
   }
}

const medidaRutas = new MedidaRutas();
 export default medidaRutas.router;