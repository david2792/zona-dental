import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {PacientesService} from '../../../servicios/referenciales/pacientes.service'
import { BuscarPersonaComponent } from '../buscador/buscar-persona/buscar-persona.component';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

 // disabled:boolean=true
  clienteformulario: FormGroup
  datos:any=[]
  mensaje=''
  alerta=false

  constructor(private pacienteServicio:PacientesService,public dialog: MatDialog) {

   this.clienteformulario = new FormGroup({
      idpersonas:new FormControl(null,Validators.required),
      cedula:new FormControl(null,Validators.required),
      nombre:new FormControl(null,Validators.required),
      grupo:new FormControl(null,Validators.required),
      telefono:new FormControl(null,Validators.required),
      odontologo:new FormControl(null,Validators.required),
      legal:new FormControl(null,Validators.required),
    });

   }
  ngOnInit(): void {

 }
 cargarDatosPersonas(valor:any=[]){
  this.clienteformulario.get('idpersonas')?.setValue(valor.idpersonas)
  this.clienteformulario.get('cedula')?.setValue(valor.ci)
  this.clienteformulario.get('nombre')?.setValue(valor.nombre+" "+valor.apellido)
 }

 guardar(){

    const confirmacion = window.confirm("Desea Guardar el Paciente?");
    if(confirmacion==true){
      this.datos = this.clienteformulario.value
      this.pacienteServicio.guadarPaciente(this.datos).subscribe(
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
   this.clienteformulario.reset()
   this.clienteformulario.get('idpersonas')?.setValue(" ")
   this.clienteformulario.get('cedula')?.setValue(" ")
   this.clienteformulario.get('nombre')?.setValue(" ")
   this.clienteformulario.get('grupo')?.setValue(" ")
   this.clienteformulario.get('telefono')?.setValue(" ")
   this.clienteformulario.get('odontologo')?.setValue(" ")
   this.clienteformulario.get('legal')?.setValue(" ")
   this.alerta=false
   this.mensaje=''
 }

abrirBuscador(){
  let dialogRef =this.dialog.open(BuscarPersonaComponent,{
    data:[]
  });
  dialogRef.afterClosed().subscribe(result => {
   // console.log(result.nombre)
    this.cargarDatosPersonas(result)
  });
}

}


