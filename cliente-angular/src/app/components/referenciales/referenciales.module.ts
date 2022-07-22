import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor/doctor.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AntecendenteMedicoComponent } from './antecendente-medico/antecendente-medico.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PersonaComponent } from './persona/persona.component';
import {MatIconModule} from '@angular/material/icon';
import { BuscarPersonaComponent } from './buscador/buscar-persona/buscar-persona.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HistorialMedicoComponent } from './historial-medico/historial-medico.component';
import {MatSelectModule} from '@angular/material/select';
import { AgendamientoComponent } from './agendamiento/agendamiento.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { AgendaListaComponent } from './agenda-lista/agenda-lista.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DiasPipe } from '../../tubo/dias.pipe'
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  declarations: [
    AntecendenteMedicoComponent,
    PersonaComponent,
    BuscarPersonaComponent,
    PersonaListaComponent,
    PacienteListaComponent,
    DoctorComponent,
    HistorialMedicoComponent,
    AgendamientoComponent,
    OdontogramaComponent,
    AgendaListaComponent,
    DiasPipe
  ],
  imports: [
    MatNativeDateModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatStepperModule

  ]
})
export class ReferencialesModule { }
