import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/control-panel/inicio/inicio.component';
import { LoginComponent } from './components/control-panel/login/login.component';
import { PrincipalComponent } from './components/control-panel/principal/principal.component';
import { AntecendenteMedicoComponent } from './components/referenciales/antecendente-medico/antecendente-medico.component';
import { PacienteComponent } from './components/referenciales/paciente/paciente.component';
import { PersonaComponent } from './components/referenciales/persona/persona.component';

const routes: Routes = [

  {
    path:'',
    component: InicioComponent,
    children:[
      {
        path:'principal',
        component:PrincipalComponent
      },
      {
        path:'personas',
        component:PersonaComponent
      },
      {
        path:'ficha',
        component:AntecendenteMedicoComponent
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
