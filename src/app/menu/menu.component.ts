import { Component, OnInit } from '@angular/core';
import { SystemService } from '../servicios/system.service';
import { HTTPServiceService } from '../servicios/httpservice.service';

declare var URL: any;
declare var window: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
URL: any;
window: any;
constructor(
  public servicio: SystemService,
  public HTTP: HTTPServiceService  
  ) {
}
  ngOnInit(): void {
    
  }

handleFileChange(event: any) {
  const file = event.target.files[0];

  if (file) {
    this.HTTP.SET(file);
    this.servicio.viewDATA();

  }
}


seleccionarArchivo() {
  const inputArchivo = document.getElementById('inputArchivo');

  if (inputArchivo) {
    inputArchivo.click();
  }

  
}
}
