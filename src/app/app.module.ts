import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SystemService } from './servicios/system.service';
import { JsonConnectService } from './servicios/json-connect.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SystemService,
    { provide: SystemService, useExisting: JsonConnectService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
