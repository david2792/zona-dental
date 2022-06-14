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
usuarios={}

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
  this.acceso.ingresar(this.usuarioFormulario.value).subscribe(
    res=>{
      console.log(res)
      localStorage.setItem('token',JSON.stringify(res))
      this.router.navigate(['/principal']);
    },
    err=>{console.log(err)}
  )
}
}
