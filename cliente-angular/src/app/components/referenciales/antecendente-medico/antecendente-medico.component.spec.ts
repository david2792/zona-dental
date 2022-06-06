import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecendenteMedicoComponent } from './antecendente-medico.component';

describe('AntecendenteMedicoComponent', () => {
  let component: AntecendenteMedicoComponent;
  let fixture: ComponentFixture<AntecendenteMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecendenteMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecendenteMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
