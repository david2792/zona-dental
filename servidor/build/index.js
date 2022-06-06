"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//rutas
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
const ruta_acceso_1 = __importDefault(require("./rutas/ruta-acceso/ruta-acceso"));
// productos referenciales
const categoria_1 = __importDefault(require("./rutas/referenciales-producto/categoria"));
const marcas_1 = __importDefault(require("./rutas/referenciales-producto/marcas"));
const unidad_medida_1 = __importDefault(require("./rutas/referenciales-producto/unidad_medida"));
const impuesto_1 = __importDefault(require("./rutas/referenciales-producto/impuesto"));
const productos_1 = __importDefault(require("./rutas/referenciales-producto/productos"));
const depositos_1 = __importDefault(require("./rutas/referenciales-producto/depositos"));
const ruta_ciudad_1 = __importDefault(require("./rutas/referenciales-localidad/ruta-ciudad"));
const ruta_genero_1 = __importDefault(require("./rutas/referenciales/ruta-genero"));
const ruta_civil_1 = __importDefault(require("./rutas/referenciales/ruta-civil"));
const ruta_profesion_1 = __importDefault(require("./rutas/referenciales/ruta-profesion"));
const rutas_persona_1 = __importDefault(require("./rutas/referenciales/rutas-persona"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.router();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    router() {
        this.app.use(indexRutas_1.default);
        // ruta de acceso
        this.app.use('/api/usuario', ruta_acceso_1.default);
        this.app.use('/api/categoria', categoria_1.default);
        this.app.use('/api/marca', marcas_1.default);
        this.app.use('/api/medida', unidad_medida_1.default);
        this.app.use('/api/impuesto', impuesto_1.default);
        this.app.use('/api/producto', productos_1.default);
        this.app.use('/api/deposito', depositos_1.default);
        // localidad
        this.app.use('/api/ciudad', ruta_ciudad_1.default);
        this.app.use('/api/genero', ruta_genero_1.default);
        this.app.use('/api/estadocivil', ruta_civil_1.default);
        this.app.use('/api/profesion', ruta_profesion_1.default);
        this.app.use('/api/persona', rutas_persona_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('servidor en 3000', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
