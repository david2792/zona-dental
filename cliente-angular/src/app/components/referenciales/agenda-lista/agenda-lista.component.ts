import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { identifierName, IfStmt } from '@angular/compiler';

interface Doctor{
  iddoctores:string;
  nombre: string;
  apellido: string;
  valor:string;
}

export interface PeriodicElement {
  codigo:string;
  hora:string;
  fecha:string;
  paciente: string;
  telefono:string;
  observacion: string;
}

@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})

export class AgendaListaComponent implements OnInit {
  doctoropciones: Doctor[]=[];
  filtroDoctores:Observable<Doctor[]>;
  doctores:any =[];
  datoDoctor = new FormControl()
  agenda:any=[]

  displayedColumns: string[] = ['codigo','hora','paciente','telefono','observacion','accion'];
  //dataSource: MatTableDataSource<any>;
  dataSource:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  datoFormulario: FormGroup;
  datos:any=[]


  ELEMENT_DATA: PeriodicElement[] = [
    {codigo:'',hora: '07:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '07:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '08:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '08:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '09:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '09:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '10:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '10:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '11:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '11:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '12:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '12:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '13:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '13:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '14:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '14:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '15:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '16:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '17:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '17:30:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},
    {codigo:'',hora: '18:00:00',fecha:'',paciente: 'LIBRE',telefono:'', observacion:""},

  ];


  constructor(public servicios: PacientesService,date: DateAdapter<Date>, private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string) {

    date.getFirstDayOfWeek = () => 1;
    this.datoFormulario = new FormGroup({
      fecha:new FormControl(null,Validators.required),
      doctor:new FormControl(null,Validators.required),
      idagendamiento:new FormControl(null),
    });
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
  ngOnInit(): void {
   // this.listar()
    this.BuscarDoctor()
    this.french()
    this.inicio()
  }
  capturarcodigo(texto:string) {
    const cod = texto.split("-")[0];
    return cod;
  }
  anularAgendamiento(idagendamientos:string){
    const estado = 1
    this.datos = [idagendamientos]
    const confirmacion = window.confirm("Desea Cancelar el Agendamiento?");
    if(confirmacion==true){
      this.servicios.anularAgenda(this.datos).subscribe(
        res=>{
         console.log(res)
        },
        err=> console.log(err)
       )
    }
     for(let i in this.ELEMENT_DATA){
          this.ELEMENT_DATA[i].codigo=''
          this.ELEMENT_DATA[i].paciente='LIBRE'
          this.ELEMENT_DATA[i].observacion=''
          this.ELEMENT_DATA[i].telefono=''
         }
        this.limpiar()
  }
  limpiar(){
    this.datoFormulario.get('doctor')?.setValue(this.capturarcodigo(this.datoDoctor.value))
    this.datoFormulario.get('fecha')
    this.datos = this.datoFormulario.value
    this.servicios.verAgenda(this.datos).subscribe((res:any)=>{
        this.agenda = res
       console.log(res)
        if(this.agenda.length>0){
          for(let i in this.ELEMENT_DATA){
            for(let j in this.agenda){
              if(this.ELEMENT_DATA[i].hora == this.agenda[j].hora){
                console.log(this.ELEMENT_DATA[i].hora +" y "+ this.agenda[j].hora)
                this.ELEMENT_DATA[i].paciente = this.agenda[j].paciente
                this.ELEMENT_DATA[i].observacion = this.agenda[j].observacion
                this.ELEMENT_DATA[i].telefono = this.agenda[j].telefono
                this.ELEMENT_DATA[i].codigo = this.agenda[j].idagendamientos
              }
              // else{
              //   this.ELEMENT_DATA[j].codigo=''
              //   this.ELEMENT_DATA[j].paciente='LIBRE'
              //   this.ELEMENT_DATA[j].observacion=''
              //   this.ELEMENT_DATA[j].telefono=''
              // }
          }
        }
        }else{
          console.log("no hay nada")
          for(let i in this.ELEMENT_DATA){
            this.ELEMENT_DATA[i].codigo=''
            this.ELEMENT_DATA[i].paciente=''
            this.ELEMENT_DATA[i].observacion='LIBRE'
            this.ELEMENT_DATA[i].telefono=''

          }
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
        this.dataSource.paginator = this.paginator

    //  this.dataSource = this.ELEMENT_DATA

      },
      err=> console.log(err)
    )
  }
  inicio(){
   this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
  }
  listar(){
    this.datoFormulario.get('doctor')?.setValue(this.capturarcodigo(this.datoDoctor.value))
    this.datoFormulario.get('fecha')
    this.datos = this.datoFormulario.value
    this.servicios.verAgenda(this.datos).subscribe((res:any)=>{
        this.agenda = res
       console.log(res)
        if(this.agenda.length>0){
          for(let i in this.ELEMENT_DATA){
            for(let j in this.agenda){
              if(this.ELEMENT_DATA[i].hora == this.agenda[j].hora){
                console.log(this.ELEMENT_DATA[i].hora +" y "+ this.agenda[j].hora)
                this.ELEMENT_DATA[i].paciente = this.agenda[j].paciente
                this.ELEMENT_DATA[i].observacion = this.agenda[j].observacion
                this.ELEMENT_DATA[i].telefono = this.agenda[j].telefono
                this.ELEMENT_DATA[i].codigo = this.agenda[j].idagendamientos
              }
              // else{
              //   this.ELEMENT_DATA[j].codigo=''
              //   this.ELEMENT_DATA[j].paciente='LIBRE'
              //   this.ELEMENT_DATA[j].observacion=''
              //   this.ELEMENT_DATA[j].telefono=''
              // }
          }
        }
        }else{
          console.log("no hay nada")
          for(let i in this.ELEMENT_DATA){
            this.ELEMENT_DATA[i].codigo=''
            this.ELEMENT_DATA[i].paciente=''
            this.ELEMENT_DATA[i].observacion='LIBRE'
            this.ELEMENT_DATA[i].telefono=''

          }
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
        this.dataSource.paginator = this.paginator

    //  this.dataSource = this.ELEMENT_DATA

      },
      err=> console.log(err)
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // buscador de profesionales
  BuscarDoctor(){
    this.servicios.getDoctores().subscribe(
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
}

