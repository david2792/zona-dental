import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesService } from 'src/app/servicios/referenciales/pacientes.service';


@Component({
  selector: 'app-persona-lista',
  templateUrl: './persona-lista.component.html',
  styleUrls: ['./persona-lista.component.css']
})

export class PersonaListaComponent implements OnInit {


persona:any=[]

displayedColumns: string[] = ['codigo', 'cedula', 'nombre','fecha_nacimiento','direccion' ,'telefono','whatsapp','ciudad','profesion','estadocivil','genero' , 'acciones'];
dataSource: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(public servicios: PacientesService) { }

  ngOnInit(): void {
    this.listar()

  }

  listar(){
    this.servicios.getPersonas().subscribe((res:any)=>{
        this.persona = res
        console.log(this.persona)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
  //       this.dataSource = this.persona

      },
      err=> console.log(err)
    )
  }

  ngAfterViewInit() {

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
