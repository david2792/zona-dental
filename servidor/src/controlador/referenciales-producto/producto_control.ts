import { query, Request, Response} from 'express';
import  { connect }  from '../../conexion/conexionBD';


class ProductoControl
{

  public async listarTodo (req:Request,res:Response):Promise<any>
  {
    const conn = await connect();
  try 
  {
    const datos =  await conn.query('SELECT * FROM vproductosgeneral');
    if(datos.length > 0)
    {
      conn.end()
      return res.json(datos);
    }
  } 
  catch (error) 
  {
    res.status(404).json({text:'las marca no existe'});
    conn.end()
  }
  } 

    
    
  public async crear(req: Request, res: Response): Promise<any> {
    const conn = await connect();
    try {
      const Codigo = await conn.query('SELECT MAX(CodigoProducto)+1 AS Codigo FROM productos')
      JSON.stringify(Codigo); 
      const CodigoProducto = Codigo[0].Codigo;
      // se inicia recuperando los datos de la tabla productos
      let producto=req.body.productos;
      const CodigoCategoria = producto.codigocategoria;
      const CodigoMarca = producto.codigomarca;
      const CodigoUnidad = '1';
      const CodigoRepresentante = '1';
      const CodigImpuesto = producto.codigimpuesto;
      const CodigoBarra =producto.codigobarra;
      const Descripcion = producto.descripcion;
      const cantidadpaquete = '0';
      const perecedero = '1';
      const peso = '0';
      const estado = '1';
      console.log("soy el producto" + producto)
      const productos = {
        CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
        CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
      }; 
      console.log("soy el producto" + productos)// datos de productos
      const codigoDeposito = producto.codigodeposito;
      const StockActual = producto.stockactual;
      const StockMinimo =producto.stockminimo;
      const StockMaximo = 0;
      let PrecioCompra = producto.preciocompra;
      if(PrecioCompra==''){
        PrecioCompra = 0
      }
      const PrecioVentaMinorista =producto.precioventaminorista;
      const PrecioVentaMayorista =producto.precioventamayorista;
      const UtilidadMinima = 0;
      const UtilidadMaxima = 0;
      const stock = {
        codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
        PrecioVentaMayorista
      }
      console.log("soy el stock" + stock)
      // console.log(stock)
      await conn.query("SET autocommit=0")
      await conn.query('INSERT INTO productos  SET ?', productos);// se inserta los datos en la tabla productos
      await conn.query('INSERT INTO stock  SET ?', stock);// se inserta los datos en la tabla stock
      await conn.query("COMMIT");// se confirma la transaccion
      await conn.query("SET autocommit=1")
     // res.status(200).json({ message: "el producto fue guardado" });
      const datos =  await conn.query('SELECT * FROM vproductosgeneral');
      conn.end()
      return res.json(datos);
    } catch (error) {
      await conn.query("ROLLBACK");
      await conn.query("SET autocommit=1")
      conn.end()
      res.status(404).json({ message: "el producto fue guardado" });
      console.log("ocurrio un error: " + error);
    }


  }



  public async modificar(req: Request, res: Response): Promise<any> 
  {
    console.log("modificar")
    const conn = await connect();
    try {
      let producto=req.body.productos;
      const CodigoProducto= producto.codigoproducto;
      const CodigoCategoria = producto.codigocategoria;
      const CodigoMarca = producto.codigomarca;
      const CodigoUnidad = '1';
      const CodigoRepresentante = '1';
      const CodigImpuesto = producto.codigimpuesto;
      const CodigoBarra =producto.codigobarra;
      const Descripcion = producto.descripcion;
      const cantidadpaquete = '0';
      const perecedero = '1';
      const peso = '0';
      const estado = '1';
     // console.log("soy el producto" + producto)
      const productos = {
        CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
        CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
      }; 
      //console.log(productos)// datos de productos
      const codigoDeposito = producto.codigodeposito;
      const StockActual = producto.stockactual;
      const StockMinimo =producto.stockminimo;
      const StockMaximo = 0;
      let PrecioCompra = producto.preciocompra;
      if(PrecioCompra==''){
        PrecioCompra = 0
      }
      const PrecioVentaMinorista =producto.precioventaminorista;
      const PrecioVentaMayorista =producto.precioventamayorista;
      const UtilidadMinima = 0;
      const UtilidadMaxima = 0;
      const stock = {
        codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
        PrecioVentaMayorista
      }
     // console.log(stock)
      console.log(stock)
      await conn.query("SET autocommit=0")
      await conn.query('UPDATE productos SET ? WHERE CodigoProducto = ?', [productos, CodigoProducto]);// se inserta los datos en la tabla productos
      await conn.query('UPDATE stock SET ? WHERE CodigoProducto = ?', [stock, CodigoProducto]);// se inserta los datos en la tabla stock
      await conn.query("COMMIT");// se confirma la transaccion
      await conn.query("SET autocommit=1")
     // res.status(200).json({ message: "el producto fue modificado" });
      const datos =  await conn.query('SELECT * FROM vproductosgeneral');
      conn.end()
      return res.json(datos);
     
    } catch (error) {
      console.log(error)
      res.status(404).json({text:'error al guardar los datos'});
      conn.end()
    }
    
  }

  
}


export const productoControl = new ProductoControl();