import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
this.dato()
  }
  dato(){
   console.log(localStorage.getItem('tokenData'))
  }
}
