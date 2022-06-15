import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { InicioComponent } from './components/control-panel/inicio/inicio.component';
import { LoginComponent } from './components/control-panel/login/login.component';
import { PrincipalComponent } from './components/control-panel/principal/principal.component';
import { AntecendenteMedicoComponent } from './components/referenciales/antecendente-medico/antecendente-medico.component';
import { PacienteListaComponent } from './components/referenciales/paciente-lista/paciente-lista.component';
import { DoctorComponent } from './components/referenciales/doctor/doctor.component';
import { PersonaListaComponent } from './components/referenciales/persona-lista/persona-lista.component';
import { PersonaComponent } from './components/referenciales/persona/persona.component';

const routes: Routes = [

  {
    path:'',
    component: InicioComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'principal',
        component:PrincipalComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'personas',
        component:PersonaComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'ficha',
        component:AntecendenteMedicoComponent,
        canActivate:[AuthGuard]
      },
     {
      path:'doctor',
      component:DoctorComponent,
      canActivate:[AuthGuard]
     },
     {
      path:'persona-listar',
      component:PersonaListaComponent,
      canActivate:[AuthGuard]
     },
     {
      path:'paciente-listar',
      component:PacienteListaComponent,
      canActivate:[AuthGuard]
     }


    ]
  },
  {
    path:'login',
    component:LoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
