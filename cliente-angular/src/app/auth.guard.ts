import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from './servicios/acceso.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private servicoAcceso:AccesoService, private router:Router){}
// esta clase se utiliza para controlar el token
  canActivate():any{
    if(this.servicoAcceso.controlLogin()){
      return true;
    }
    this.router.navigate(['/login']);
    return false
  }

}
