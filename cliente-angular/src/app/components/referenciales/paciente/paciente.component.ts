import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, Observable,startWith} from 'rxjs';

import {PacientesService} from '../../../servicios/referenciales/pacientes.service'

interface Ciudad {
  idciudad:string;
  nombre: string;
}

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  options: Ciudad[] = [];
  control = new FormControl();
  filCiudad: Observable<Ciudad[]>;
  ciudades: any =[];

  clienteformulario: FormGroup = this._formBuilder.group({
    ciudad:new FormControl('',Validators.required),
    cedula:new FormControl('',Validators.required),
    ruc:new FormControl('',Validators.required),
    razonsocial:new FormControl('',Validators.required),
    fechanacimiento:new FormControl('',Validators.required),
    direccion:new FormControl('',Validators.required),
    telefono:new FormControl('',Validators.required)
  });

  constructor(private _formBuilder: FormBuilder, private pacienteServicio:PacientesService) { }

  ngOnInit(): void {
    this.BuscarCiudad()
 }
  BuscarCiudad(){
    this.pacienteServicio.consutlaCiudad().subscribe(
      res => {
        this.ciudades = res
        return this.options = this.ciudades
      },
      err => console.error(err)
    ),
    this.filCiudad = this.control.valueChanges.pipe(
      debounceTime(1000),
      startWith(' '),
      //map(val => this._filter(val)
      map(value => typeof value === 'string' ? value : value.nombre),
      map(nombre => nombre ? this._filter(nombre) : this.options.slice())
    )
  }
  private _filter(value: string): Ciudad[] {
    const filterValue = value.toLowerCase();
    console.log(this.ciudades)
    return this.options.filter(ciudad => ciudad.nombre.toLowerCase().indexOf(filterValue)==0 );
  }

}
