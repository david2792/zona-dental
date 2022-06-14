import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map,debounceTime,startWith, Observable } from 'rxjs';
import {PacientesService} from '../../../servicios/referenciales/pacientes.service'
import {Personas} from '../../../modelo/referenciales-personas/Personas'

interface Ciudad {
  idciudad:string;
  nombre: string;
}

interface Generos {
  idgenero: string;
  descripcion:string;
}

interface Profesion {
  idprofesion: string;
  descripcion: string;
}

interface Estado{
  idestado:string;
  descripcion:string;
}



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  options: Ciudad[] = [];
  filCiudad: Observable<Ciudad[]>;
  ciudades: any =[];

  profesionopciones: Profesion[] = [];
  filtroProfesiones: Observable<Profesion[]>
  profesiones:any=[]

  estadoopciones: Estado[] = []
  filtroEstados: Observable<Estado[]>
  estados:any=[]

  generopciones: Generos[] = [];
  filtroGenero:Observable<Generos[]>;
  generos:any=[]


  datosPeronas: FormGroup;

  datosgenero = new FormControl()
  datosciudad= new FormControl()
  datosprofesion=new FormControl()
  datosestado= new FormControl()

 datos:any[]=[]

 personas:Personas={
  idpacientes:'',
  nombre:'',
  apellido:'',
  ci:'',
  ruc:'',
  fecha:'',
  correo:'',
  telefono:'',
  whatsapp:'',
  direccion:'',
  ciudad:'',
  genero:'',
  esado:'',
  profesion:'',
}

mensaje=''
alerta=false

  constructor( private pacienteServicio:PacientesService, private formBuilder: FormBuilder) {

      this.datosPeronas = new FormGroup({

        nombre: new FormControl(null,[Validators.required]),
        apellido:new FormControl(null,Validators.required),
        cedula:new FormControl(null,Validators.required),
        ruc:new FormControl(null,Validators.required),
        fecha:new FormControl(null,Validators.required),
        correo:new FormControl(null,Validators.required),
        direccion:new FormControl(null,Validators.required),
        telefono:new FormControl(null,Validators.required),
        whatsapp:new FormControl(null,Validators.required),
        emergencia:new FormControl(null,Validators.required),
        grupo_sanguineo:new FormControl(null,Validators.required),
        odontologo:new FormControl(null,Validators.required),
        tutor:new FormControl(null,Validators.required),
        idgenero: new FormControl(),
        idciudad: new FormControl(),
        idprofesion:new FormControl(),
        idestado: new FormControl(),
      });

   }

  ngOnInit(): void {
    this.BuscarCiudad()
    this.BuscarGenero()
    this.BuscarProfesion()
    this.BuscarEstado()
  }
limpiar(){
  this.datosgenero.setValue('')
  this.datosciudad.setValue('')
  this.datosestado.setValue('')
  this.datosprofesion.setValue('')
  this.alerta=false
  this.mensaje=''
}
 crearPersona(){
   this.datos = this.datosPeronas.value
   this.datosPeronas.get('idciudad')?.setValue(this.datosciudad.value)
   this.datosPeronas.get('idprofesion')?.setValue(this.datosprofesion.value)
   this.datosPeronas.get('idgenero')?.setValue(this.datosgenero.value)
   this.datosPeronas.get('idestado')?.setValue(this.datosestado.value)
   this.personas = this.datosPeronas.value
   console.log(this.personas)
   const confirmacion = window.confirm("Desea Guardar el Paciente?");
    if(confirmacion==true){
      this.pacienteServicio.guardarPersonas(this.personas).subscribe(
        res=>{
          console.log(res)
          this.alerta=true;
          this.mensaje= "REGISRO GUARDADO"
        },
        err=>{
          console.log(err)
          this.alerta=true
          this.mensaje="OCURRIO UN ERROR"

        }
     )
     this.datosPeronas.reset();
    this.limpiar()
    }
 }



  BuscarCiudad(){
    this.pacienteServicio.consutlaCiudad().subscribe(
      res => {
        this.ciudades = res
        return this.options = this.ciudades
      },
      err => console.error(err)
    ),
    this.filCiudad = this.datosciudad.valueChanges.pipe(
      debounceTime(1000),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.nombre),
      map(nombre => nombre ? this._filter(nombre) : this.options.slice())
    )
  }
  private _filter(value: string): Ciudad[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(ciudad => ciudad.nombre.toLowerCase().indexOf(filterValue)==0 );
  }

  BuscarGenero(){
    this.pacienteServicio.consultaGenero().subscribe(
      res => {
        this.generos = res
        return this.generopciones = this.generos
      },
      err => console.error(err)
    ),
    this.filtroGenero = this.datosgenero.valueChanges
    .pipe(
      debounceTime(1000),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.descripcion),
      map(descripcion => descripcion ? this._filterGenero(descripcion) : this.generopciones.slice())
    )
  }


  private _filterGenero(value: string): Generos[] {
    const filterValue = value.toLowerCase();
    return this.generopciones.filter(genero => genero.descripcion.toLowerCase().indexOf(filterValue)==0);
  }

  BuscarProfesion(){
    this.pacienteServicio.consultaProfesion().subscribe(
      res => {
        this.profesiones = res
        return this.profesionopciones = this.profesiones
      },
      err => console.error(err)
    ),
    this.filtroProfesiones = this.datosprofesion.valueChanges
    .pipe(
      debounceTime(1000),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.descripcion),
      map(descripcion => descripcion ? this._filterProfesion(descripcion) : this.profesionopciones.slice())
    )
  }
  private _filterProfesion(value: string): Profesion[] {
    const filterValue = value.toLowerCase();
    return this.profesionopciones.filter(profesion => profesion.descripcion.toLowerCase().indexOf(filterValue)==0);
  }

  BuscarEstado(){
    this.pacienteServicio.consultarEstadoCivil().subscribe(
      res => {
        this.estados = res
        console.log(this.estados)
        return this.estadoopciones = this.estados
      },
      err => console.error(err)
    ),
    this.filtroEstados = this.datosestado.valueChanges
    .pipe(
      debounceTime(1000),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.descripcion),
      map(descripcion => descripcion ? this._filterEstado(descripcion) : this.estadoopciones.slice())
    )
  }
  private _filterEstado(value: string): Estado[] {
    const filterValue = value.toLowerCase();
    return this.estadoopciones.filter(estado => estado.descripcion.toLowerCase().indexOf(filterValue)==0);
  }

}
