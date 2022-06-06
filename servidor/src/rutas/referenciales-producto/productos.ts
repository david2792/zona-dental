import { Router } from 'express';
import { productoControl } from '../../controlador/referenciales-producto/producto_control';

class ProductosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       
       this.router.post('/guardar',productoControl.crear);
       this.router.put('/modificar/',productoControl.modificar);
       this.router.get('/listar',productoControl.listarTodo);
      
       

      
   }
}

const productosRutas = new ProductosRutas();
 export default productosRutas.router;