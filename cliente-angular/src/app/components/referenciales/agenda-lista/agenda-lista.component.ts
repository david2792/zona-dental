import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

interface Doctor{
  iddoctores:string;
  nombre: string;
  apellido: string;
  valor:string;
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

  displayedColumns: string[] = ['codigo','hora','fecha','paciente','telefono','observacion','accion'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  datoFormulario: FormGroup;
  datos:any=[]
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
         this.listar()
        },
        err=> console.log(err)
       )
    }

  }
  listar(){
    this.datoFormulario.get('doctor')?.setValue(this.capturarcodigo(this.datoDoctor.value))
    this.datoFormulario.get('fecha')
    this.datos = this.datoFormulario.value
    console.log(this.datos)
    this.servicios.verAgenda(this.datos).subscribe((res:any)=>{
        this.agenda = res
        console.log(this.agenda)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
  //       this.dataSource = this.persona

      },
      err=> console.log(err)
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

