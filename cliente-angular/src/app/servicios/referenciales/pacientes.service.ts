import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personas } from 'src/app/modelo/referenciales-personas/Personas';

import {Pacientes} from '../../modelo/referenciales-personas/Pacientes'
import { AccesoService } from '../acceso.service';

@Injectable({
  providedIn: 'root'
})

export class PacientesService {
  valor:any='valor'

  // API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private rutas:AccesoService) {}
      consutlaCiudad(){
      return this.http.get(`${this.rutas.API_URI}/ciudad/listar`)
    }
    guadarPaciente(paciente:Pacientes){
      return this.http.post(`${this.rutas.API_URI}/persona/crearpaciente`,paciente)
    }
// referenciales
    consultaGenero(){
      return this.http.get(`${this.rutas.API_URI}/genero/listar`)
    }
    consultaProfesion(){
      return this.http.get(`${this.rutas.API_URI}/profesion/listar`)
    }
    consultarEstadoCivil(){
      return this.http.get(`${this.rutas.API_URI}/estadocivil/listar`)
    }

    guardarPersonas(paciente:Personas){
      return this.http.post(`${this.rutas.API_URI}/persona/crear`,paciente);
    }
    getPersonas(){
      return this.http.get(`${this.rutas.API_URI}/persona/listar`);
    }

    getPacientes(){
          return this.http.get(`${this.rutas.API_URI}/persona/listar-paciente`);
        }

// aca comienza los servicios de doctores
guardarDoctores(doctor:any ){
  return this.http.post(`${this.rutas.API_URI}/persona/doctor`,doctor);
}
getDoctores(){
  return this.http.get(`${this.rutas.API_URI}/persona/doctor/listar`);
}
}

