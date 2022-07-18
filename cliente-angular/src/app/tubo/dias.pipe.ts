import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dias'
})
export class DiasPipe implements PipeTransform {

  transform(args:any): any {
    if(args!=null){
      var dias = new Date(args)

      switch(dias.getDay()){
        case 1: return 'LUNES';
        case 2: return 'MARTES';
        case 3: return 'MIERCOLES';
        case 4: return 'JUEVES';
        case 5: return 'VIERNES';
        case 6: return 'SABADO';
        case 7: return 'SABADO';
        case 0: return 'DOMINGO';

      }
    }
  }

}
