import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  opened = false
  public acceso:AccesoService
  usuario: any
  constructor(private router:Router, private datos:PacientesService) { }

  ngOnInit(): void {
   this.usuario = this.datos.mostarTokenData().users
   //this.usuario= this.datosUsuario.datosUsuario.codigo

  }

  salirLogin(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
    console.log("jol")
  }
}
