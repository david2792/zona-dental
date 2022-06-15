import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {PacientesService} from '../../../servicios/referenciales/pacientes.service'
import { BuscarPersonaComponent } from '../buscador/buscar-persona/buscar-persona.component';


@Component({
  selector: 'app-paciente',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

 // disabled:boolean=true
 doctorFormulario: FormGroup
  datos:any=[]
  mensaje=''
  alerta=false

  constructor(private pacienteServicio:PacientesService,public dialog: MatDialog) {

   this.doctorFormulario = new FormGroup({
      cedula:new FormControl(null,Validators.required),
      nombre:new FormControl(null,Validators.required),
      apellido:new FormControl(null,Validators.required),
      matricula:new FormControl(null,Validators.required),
      telefono:new FormControl(null,Validators.required),
    });

   }
  ngOnInit(): void {

 }

 guardar(){

    const confirmacion = window.confirm("Desea Guardar el Paciente?");
    if(confirmacion==true){
      this.datos = this.doctorFormulario.value
      console.log(this.datos)
      this.pacienteServicio.guardarDoctores(this.datos).subscribe(
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
        this.limpiar()
    }
 }
 limpiar(){
   this.doctorFormulario.reset()
   this.doctorFormulario.get('idpersonas')?.setValue(" ")
   this.doctorFormulario.get('cedula')?.setValue(" ")
   this.doctorFormulario.get('nombre')?.setValue(" ")
   this.doctorFormulario.get('grupo')?.setValue(" ")
   this.doctorFormulario.get('telefono')?.setValue(" ")
   this.doctorFormulario.get('odontologo')?.setValue(" ")
   this.doctorFormulario.get('legal')?.setValue(" ")
   this.alerta=false
   this.mensaje=''
 }


}


