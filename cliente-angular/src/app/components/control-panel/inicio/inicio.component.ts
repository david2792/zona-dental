import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  opened = false
  public acceso:AccesoService
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  salirLogin(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
    console.log("jol")
  }
}
