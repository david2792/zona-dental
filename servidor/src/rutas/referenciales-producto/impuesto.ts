import { Router } from 'express';
import { impuestoControl } from '../../controlador/referenciales-producto/impuesto_control';

class ImpuestoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar/',impuestoControl.listarTodo);
       this.router.post('/crear/',impuestoControl.crear);
       this.router.put('/modificar/',impuestoControl.modificar);
       

      
   }
}

 const impuestoRutas = new ImpuestoRutas();
export default impuestoRutas.router