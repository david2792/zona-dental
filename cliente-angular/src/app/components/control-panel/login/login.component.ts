import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
mensaje:any=''
alerta:boolean=false
usuarioFormulario:FormGroup
  constructor(private acceso:AccesoService, private router:Router) {
    this.usuarioFormulario = new FormGroup(
      {
        usuario:new FormControl(null,Validators.required),
        contraseña:new FormControl(null,Validators.required)
      }
      )
  }

  ngOnInit(): void {
  }
login(){
  this.acceso.ingresar(this.usuarioFormulario.value).subscribe((res:any)=>{
     // console.log(res)
     localStorage.setItem('token',res.token)
    //  console.log(res)
      this.alerta=false
      this.router.navigate(['/principal']);
    },
    err=>{
      this.alerta=true
      console.log(err)}
  )
}
cerrar(){
  this.alerta=false
}
}
