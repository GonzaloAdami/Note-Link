import { Component, Inject, OnInit, Renderer2, ElementRef, HostListener, Input } from '@angular/core';
import { SystemService } from './servicios/system.service';
import { JsonConnectService } from './servicios/json-connect.service';
import { CreateSystemService } from './create-system.service';
import { BDService } from './bd.service';
import { LocalStorageService } from './local-storage.service';
import { RenderPhotoSystemService } from './render-photo-system.service';
import { DeleteSystemService } from './delete-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SystemService],
})
export class AppComponent implements OnInit {

  depuration: boolean = false;
 
  constructor(
    @Inject(SystemService) public servicio: SystemService,
    @Inject(CreateSystemService) public createSystem: CreateSystemService,
    @Inject(BDService) public bdService: BDService,
    @Inject(LocalStorageService) public localStorage: LocalStorageService,
    @Inject(RenderPhotoSystemService) public renderPhoto: RenderPhotoSystemService,
    @Inject(DeleteSystemService) public deleteSystem: DeleteSystemService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    if(this.depuration){
      alert('Depuracion activada');
    }
    
  }

  deletePost(postId: number, event: Event): void {
    event.preventDefault(); // Detener la propagación del evento de clic
    this.localStorage.delete('targets', postId);
  }
 

  
}
