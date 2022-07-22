import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial-medico',
  templateUrl: './historial-medico.component.html',
  styleUrls: ['./historial-medico.component.css']
})
export class HistorialMedicoComponent implements OnInit {
no:any = "NO"

firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});
tercFormGroup = this._formBuilder.group({
  tercdCtrl: ['', Validators.required],
});



  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
