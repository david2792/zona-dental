import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';


interface Doctor{
  iddoctores:string;
  nombre: string;
  apellido: string;
  valor:string;
}

interface Paciente{
  idpersonas:string;
  nombre:string;
  apellido:string;
}
@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})


export class AgendamientoComponent implements OnInit {


  doctoropciones: Doctor[]=[];
  filtroDoctores:Observable<Doctor[]>;
  doctores:any =[];
// BUSCADOR DE PACIENTES
  pacienteopciones: Paciente[]=[];
  filtroPacientes: Observable<Paciente[]>
  pacientes:any=[];

  // formulario
  datoDoctor = new FormControl()
  datoPaciente = new FormControl()
  // fin

  datoFormulario: FormGroup
  datos:any=[]

  mensaje=''
  alerta=false
  bandera=0
  constructor(private pacienteServicio:PacientesService,date: DateAdapter<Date>, private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string) {
    this.datoFormulario = new FormGroup({
      fecha:new FormControl(null,Validators.required),
      hora:new FormControl(null,Validators.required),
      observacion:new FormControl(null,Validators.required),
      persona:new FormControl(null,Validators.required),
      doctor:new FormControl(null,Validators.required),
    });
  }

  ngOnInit(): void {
   this.BuscarDoctor()
   this.BuscarPaciente()
   this.french()
  }
  french() {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }
  getDateFormatString(): string {
    if (this._locale === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale === 'es') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  BuscarDoctor(){
    this.pacienteServicio.getDoctores().subscribe(
      res => {
        this.doctores = res
        console.log(this.doctores)
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
  BuscarPaciente(){
    this.pacienteServicio.getPersonas().subscribe(
      res=>{
        this.pacientes = res
        console.log(this.pacientes)
        return this.pacienteopciones = this.pacientes
      },
      err=>console.log(err)
    ),
    this.filtroPacientes = this.datoPaciente.valueChanges.pipe(
      debounceTime(10),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.nombre),
      map(valor => valor ? this._filterPaciente(valor ) : this.pacienteopciones.slice())
    )
  }
  private _filterPaciente(value: string): Paciente[] {
    const filterValue = value.toLowerCase();
    return this.pacienteopciones.filter(paciente => paciente.nombre.toLowerCase().indexOf(filterValue)==0);
  }
  capturarcodigo(texto:string) {
    const cod = texto.split("-")[0];
    return cod;
  }
canelar(){
  const confirmacion = window.confirm("Desea Cancelar el Agendamiento?");
    if(confirmacion==true){
      this.datoFormulario.get('persona')?.setValue(this.capturarcodigo(this.datoPaciente.value))
      this.datoFormulario.get('doctor')?.setValue(this.capturarcodigo(this.datoDoctor.value))
      this.datos = this.datoFormulario.value
      console.log(this.datos)
      this.pacienteServicio.guardarAgenda(this.datos).subscribe(
           res=>{
             console.log(res)
             this.alerta=true;
             this.mensaje= "REGISTRO GUARDADO"
           },
           err=>{
            console.log(err)


          }
        ),
        this.limpiar()
        this.datoFormulario.reset();


    }
}
  // guardar
  guardar(){

    const confirmacion = window.confirm("Desea Registrar el Agendamiento?");
    if(confirmacion==true){
      this.datoFormulario.get('persona')?.setValue(this.capturarcodigo(this.datoPaciente.value))
      this.datoFormulario.get('doctor')?.setValue(this.capturarcodigo(this.datoDoctor.value))
      this.datos = this.datoFormulario.value
      console.log(this.datos)
      this.pacienteServicio.guardarAgenda(this.datos).subscribe(
           res=>{
             console.log(res)
             this.alerta=true;
             this.mensaje= "REGISTRO GUARDADO"
           },
           err=>{
            console.log(err)


          }
        ),
        this.limpiar()
        this.datoFormulario.reset();


    }
 }
 limpiar(){
  this.datoDoctor.setValue('')
  this.datoPaciente.setValue('')
  this.alerta=false
  this.mensaje=''
}

}
