import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';
import { PacienteComponent } from '../../paciente/paciente.component';
import { FormsModule } from '@angular/forms';

export interface DatoPersona {
  idpersonas: string;
  nombre: string;
  apellido: string;
  cedula: string;
}


@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {
bandera:boolean=true
// se crea un array de personas para la tabla
  personas:DatoPersona[]=[]
  persona:any=[]

  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public servi:PacientesService, public servicios: PacientesService,
    public dialogRef: MatDialogRef<BuscarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
  }


  ngOnInit(): void {

    this.servicios.getPersonas().subscribe((res:any)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator

      },
      err=> console.log(err)
    )

  }
  onclose(){
    this.dialogRef.close()
  }
datos(row){
  this.data=row
  this.bandera=false
  console.log(this.data)

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toUpperCase();
  console.log(this.dataSource)

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
