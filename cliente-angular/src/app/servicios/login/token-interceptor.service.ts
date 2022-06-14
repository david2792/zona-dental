import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccesoService } from '../acceso.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private servicio:AccesoService) { }

  intercept(req,next) {
   const tokenReq= req.clone({
      setHeaders:{
        Authorization: `Bearder ${this.servicio.getToken()}`
      }
    })
    return next.handle(tokenReq);
  }


}
