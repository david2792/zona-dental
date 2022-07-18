import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  //public API_URI = 'http://localhost:3000/api'
 public API_URI = 'http://143.110.236.61:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  ingresar(usuario){
    return this.http.post(`${this.API_URI}/usuario/login`,usuario)
  }

  controlLogin(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  salirLogin(){
    localStorage.removeItem('token');
    this.router.navigate['/login']
  }
}


