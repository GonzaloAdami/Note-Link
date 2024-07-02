import { Component, OnInit } from '@angular/core';
import { SystemService } from '../servicios/system.service';
import { HTTPServiceService } from '../servicios/httpservice.service';
import { CreateSystemService } from '../create-system.service';
import { RenderPhotoSystemService } from '../render-photo-system.service';

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
base64Image: string = "../assets/defaultPost.webp";
constructor(
  public servicio: SystemService,
  public HTTP: HTTPServiceService,
  public createSystem: CreateSystemService,
  public render: RenderPhotoSystemService
  ) {
}
  ngOnInit(): void {
    
  }
  async datosInput(): Promise<void> {
    const imgElement = document.getElementById('img') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const urlElement = document.getElementById('url') as HTMLInputElement;

    const file = imgElement.files?.[0];
    if (file) {
      try {
        const img = await this.render.handleImageUpload(file);
        const name = nameElement.value;
        const url = urlElement.value;
        this.createSystem.createTarget(img, name, url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    
  }else{
    const img = this.base64Image;
    const name = nameElement.value;
    const url = urlElement.value;
    this.createSystem.createTarget(img, name, url);
  }
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.render.handleImageUpload(file)
        .then(base64String => {
          this.base64Image = base64String;
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }
  }

}
