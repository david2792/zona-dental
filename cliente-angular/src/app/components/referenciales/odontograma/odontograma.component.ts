import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.arco()
    this.arco2()
  }
private arco(){
  var elCanvas = document.getElementById("canvas") as HTMLCanvasElement;;
		if (elCanvas && elCanvas.getContext) {
		var context = elCanvas.getContext("2d");
    var context2 = elCanvas.getContext("2d");
			if (context) {
					var X = elCanvas.width/2;
					var Y = 100;
					var r = 50;
					var aPartida = (Math.PI / 180) * 220;
					var aFinal =  (Math.PI / 180) * 320;
          context.lineWidth =4
					context.strokeStyle = "write";
					context.arc(X,Y,r,aPartida,aFinal,false);

          context.lineWidth = 4;  // Cambia el grosor de la linea

          context.moveTo(1000,50); // Punto de inicio de la linea
          context.lineTo(50,80); // Punto final de la linea e inicio de la siguiente linea


					context.stroke();
			}
		}
}

private arco2(){
  var elCanvas = document.getElementById("canvas2") as HTMLCanvasElement;;
		if (elCanvas && elCanvas.getContext) {
		var context = elCanvas.getContext("2d");
			if (context) {

          context.lineWidth = 4;  // Cambia el grosor de la linea

          context.moveTo(0,0); // Punto de inicio de la linea
          context.lineTo(300,120); // Punto final de la linea e inicio de la siguiente linea
          context.lineTo(300,0); // Punto final de la linea

          context.moveTo(300,0); // Punto inicial de la linea
          context.lineTo(0,120); // Punto final de la linea

					context.stroke();


			}
		}
}
}
