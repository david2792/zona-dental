import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personas } from 'src/app/modelo/referenciales-personas/Personas';

import {Pacientes} from '../../modelo/referenciales-personas/Pacientes'

@Injectable({
  providedIn: 'root'
})
export class PacientesService {


  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}
      consutlaCiudad(){
      return this.http.get(`${this.API_URI}/ciudad/listar`)
    }
    guadarPaciente(pacientes:Pacientes){
      return this.http.post(`${this.API_URI}/guardar`,pacientes)
    }
// referenciales
    consultaGenero(){
      return this.http.get(`${this.API_URI}/genero/listar`)
    }
    consultaProfesion(){
      return this.http.get(`${this.API_URI}/profesion/listar`)
    }
    consultarEstadoCivil(){
      return this.http.get(`${this.API_URI}/estadocivil/listar`)
    }

    guardarPersonas(paciente:Personas){
      return this.http.post(`${this.API_URI}/persona/crear`,paciente);
    }

}
