"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoControl = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ProductoControl {
    listarTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const datos = yield conn.query('SELECT * FROM vproductosgeneral');
                if (datos.length > 0) {
                    conn.end();
                    return res.json(datos);
                }
            }
            catch (error) {
                res.status(404).json({ text: 'las marca no existe' });
                conn.end();
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, conexionBD_1.connect)();
            try {
                const Codigo = yield conn.query('SELECT MAX(CodigoProducto)+1 AS Codigo FROM productos');
                JSON.stringify(Codigo);
                const CodigoProducto = Codigo[0].Codigo;
                // se inicia recuperando los datos de la tabla productos
                let producto = req.body.productos;
                const CodigoCategoria = producto.codigocategoria;
                const CodigoMarca = producto.codigomarca;
                const CodigoUnidad = '1';
                const CodigoRepresentante = '1';
                const CodigImpuesto = producto.codigimpuesto;
                const CodigoBarra = producto.codigobarra;
                const Descripcion = producto.descripcion;
                const cantidadpaquete = '0';
                const perecedero = '1';
                const peso = '0';
                const estado = '1';
                console.log("soy el producto" + producto);
                const productos = {
                    CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
                    CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
                };
                console.log("soy el producto" + productos); // datos de productos
                const codigoDeposito = producto.codigodeposito;
                const StockActual = producto.stockactual;
                const StockMinimo = producto.stockminimo;
                const StockMaximo = 0;
                let PrecioCompra = producto.preciocompra;
                if (PrecioCompra == '') {
                    PrecioCompra = 0;
                }
                const PrecioVentaMinorista = producto.precioventaminorista;
                const PrecioVentaMayorista = producto.precioventamayorista;
                const UtilidadMinima = 0;
                const UtilidadMaxima = 0;
                const stock = {
                    codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                    PrecioVentaMayorista
                };
                console.log("soy el stock" + stock);
                // console.log(stock)
                yield conn.query("SET autocommit=0");
                yield conn.query('INSERT INTO productos  SET ?', productos); // se inserta los datos en la tabla productos
                yield conn.query('INSERT INTO stock  SET ?', stock); // se inserta los datos en la tabla stock
                yield conn.query("COMMIT"); // se confirma la transaccion
                yield conn.query("SET autocommit=1");
                // res.status(200).json({ message: "el producto fue guardado" });
                const datos = yield conn.query('SELECT * FROM vproductosgeneral');
                conn.end();
                return res.json(datos);
            }
            catch (error) {
                yield conn.query("ROLLBACK");
                yield conn.query("SET autocommit=1");
                conn.end();
                res.status(404).json({ message: "el producto fue guardado" });
                console.log("ocurrio un error: " + error);
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("modificar");
            const conn = yield (0, conexionBD_1.connect)();
            try {
                let producto = req.body.productos;
                const CodigoProducto = producto.codigoproducto;
                const CodigoCategoria = producto.codigocategoria;
                const CodigoMarca = producto.codigomarca;
                const CodigoUnidad = '1';
                const CodigoRepresentante = '1';
                const CodigImpuesto = producto.codigimpuesto;
                const CodigoBarra = producto.codigobarra;
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
                const StockMinimo = producto.stockminimo;
                const StockMaximo = 0;
                let PrecioCompra = producto.preciocompra;
                if (PrecioCompra == '') {
                    PrecioCompra = 0;
                }
                const PrecioVentaMinorista = producto.precioventaminorista;
                const PrecioVentaMayorista = producto.precioventamayorista;
                const UtilidadMinima = 0;
                const UtilidadMaxima = 0;
                const stock = {
                    codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                    PrecioVentaMayorista
                };
                // console.log(stock)
                console.log(stock);
                yield conn.query("SET autocommit=0");
                yield conn.query('UPDATE productos SET ? WHERE CodigoProducto = ?', [productos, CodigoProducto]); // se inserta los datos en la tabla productos
                yield conn.query('UPDATE stock SET ? WHERE CodigoProducto = ?', [stock, CodigoProducto]); // se inserta los datos en la tabla stock
                yield conn.query("COMMIT"); // se confirma la transaccion
                yield conn.query("SET autocommit=1");
                // res.status(200).json({ message: "el producto fue modificado" });
                const datos = yield conn.query('SELECT * FROM vproductosgeneral');
                conn.end();
                return res.json(datos);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ text: 'error al guardar los datos' });
                conn.end();
            }
        });
    }
}
exports.productoControl = new ProductoControl();
