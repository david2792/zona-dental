import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  codigo: string;
  enfermedad: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'HIPERTENCION',
  'DIABETES',
  'CARDIOPATIA',
  'ALERGIA',
  'MARCAPASOS'
];

const MEDICACION: string[] = [
  'HIPERTENCION',
  'DIABETES',
  'CARDIOPATIA',
  'ALERGIA',
  'MARCAPASOS'
];


@Component({
  selector: 'app-antecendente-medico',
  templateUrl: './antecendente-medico.component.html',
  styleUrls: ['./antecendente-medico.component.css']
})
export class AntecendenteMedicoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'enfermedad'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
       // Create 100 users
       const users = Array.from({length: 5}, (_, k) => createNewUser(k + 1));

       // Assign the data to the data source for the table to render
       this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(codigo: number): UserData {
  const enfermedad =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';
  


  return {
    codigo: codigo.toString(),
    enfermedad: enfermedad,

  };
}
