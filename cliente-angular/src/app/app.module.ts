import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//componentes

//modulos de angular material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ControlPanelModule } from './components/control-panel/control-panel.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReferencialesModule } from './components/referenciales/referenciales.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './servicios/login/token-interceptor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ControlPanelModule,
    MatSidenavModule,
    ReferencialesModule,
    HttpClientModule,
    MatDatepickerModule,

  ],
  providers: [
    AuthGuard,{
      provide: [HTTP_INTERCEPTORS],
      useClass: TokenInterceptorService,
      multi:true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
