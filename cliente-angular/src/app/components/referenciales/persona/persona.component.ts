import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map,debounceTime,startWith, Observable } from 'rxjs';
import {PacientesService} from '../../../servicios/referenciales/pacientes.service'
import {Personas} from '../../../modelo/referenciales-personas/Personas'
import { BuscarPersonaComponent } from '../buscador/buscar-persona/buscar-persona.component';
import { MatDialog } from '@angular/material/dialog';
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

interface Doctor{
  iddoctores:string;
  nombre: string;
  apellido: string;
  valor:string;
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

  doctoropciones: Doctor[]=[];
  filtroDoctores:Observable<Doctor[]>;
  doctores:any =[];

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
  datoDoctor= new FormControl()

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

  constructor( private pacienteServicio:PacientesService, private formBuilder: FormBuilder,public dialog: MatDialog) {

      this.datosPeronas = new FormGroup({

        nombre: new FormControl(null,[Validators.required]),
        apellido:new FormControl(null,Validators.required),
        cedula:new FormControl(null,Validators.required),
        ruc:new FormControl(null,Validators.required),
        fecha:new FormControl(null,Validators.required),
        correo:new FormControl(null),
        direccion:new FormControl(null),
        telefono:new FormControl(null,Validators.required),
        whatsapp:new FormControl(null,Validators.required),
        emergencia:new FormControl(),
        grupo_sanguineo:new FormControl(),
        tutor:new FormControl(),
        idgenero: new FormControl(),
        idciudad: new FormControl(),
        idprofesion:new FormControl(),
        idestado: new FormControl(),
        iddoctores:new FormControl(),
       // doctor:new FormControl(null,Validators.required),
      });

   }

  ngOnInit(): void {
    this.BuscarCiudad()
    this.BuscarGenero()
    this.BuscarProfesion()
    this.BuscarEstado()
    this.BuscarDoctor()
  }
  // buscador

  cargarDatosPersonas(valor:any=[]){
    this.datosPeronas.get('iddoctores')?.setValue(valor.iddoctores)
    this.datosPeronas.get('doctor')?.setValue(valor.nombre+" "+valor.apellido)
   }
  //  abrirBuscador(){
  //   let dialogRef =this.dialog.open(BuscarPersonaComponent,{
  //     data:[]
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.cargarDatosPersonas(result)
  //   });
  // }
  BuscarDoctor(){
    this.pacienteServicio.getDoctores().subscribe(
      res => {
        this.doctores = res
        return this.doctoropciones = this.doctores
      },
      err => console.error(err)
    ),
    this.filtroDoctores = this.datoDoctor.valueChanges.pipe(
      debounceTime(10),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.valor),
      map(valor => valor ? this._filterDoctor(valor ) : this.doctoropciones.slice())
    )
  }
  private _filterDoctor(value: string): Doctor[] {
    const filterValue = value.toLowerCase();
    return this.doctoropciones.filter(doctor => doctor.nombre.toLowerCase().indexOf(filterValue)==0);
  }
  // fin
  capturarcodigo(texto:string) {
    const cod = texto.split("-")[0];
    return cod;
  }

  codigoCiudad(){

   const codigo =(this.datosciudad.value)
   console.log(codigo.toString())
   console.log("Soy el codigo de ciudad: "+this.capturarcodigo(codigo.toString()))
  }
limpiar(){
  this.datosgenero.setValue('')
  this.datosciudad.setValue('')
  this.datosestado.setValue('')
  this.datosprofesion.setValue('')
  this.datoDoctor.setValue('')

  this.alerta=false
  this.mensaje=''
}
 crearPersona(){
   this.datos = this.datosPeronas.value
   this.datosPeronas.get('idciudad')?.setValue(this.datosciudad.value)
   this.datosPeronas.get('idprofesion')?.setValue(this.datosprofesion.value)
   this.datosPeronas.get('idgenero')?.setValue(this.datosgenero.value)
   this.datosPeronas.get('idestado')?.setValue(this.datosestado.value)
   this.datosPeronas.get('iddoctores')?.setValue(this.capturarcodigo(this.datoDoctor.value))
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
    )
    this.filCiudad = this.datosciudad.valueChanges.pipe(
      debounceTime(100),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.nombre),
      map(nombre => nombre ? this._filter(nombre ) : this.options.slice())
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
      debounceTime(100),
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
      debounceTime(100),
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
      debounceTime(100),
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
