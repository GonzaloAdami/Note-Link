import { Injectable } from '@angular/core';
import { JsonConnectService } from './json-connect.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPServiceService {

  imagenTemporal: string | null = null;
  public foto: File | null = null;
  public photoURL: string | null = null;
  public nuevoId: number = 0;
  constructor(

    public jsonConnectService: JsonConnectService

  ) { }
  VIEW() {
    var image = document.getElementById("photoMenu");
  
    if (image) {
      image.style.backgroundImage = `url(${this.imagenTemporal})`;
    } else {
      console.error("Element with ID 'photoMenu' not found");
    }
    console.log(image?.style.backgroundImage);
  }
  GET(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      try {
        this.imagenTemporal = URL.createObjectURL(file);
        console.log("Foto metodo get " + this.imagenTemporal)
        this.VIEW();
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  }

  SET(file: File): void {
    this.foto = file;
    const menuElement = document.getElementById("menu");
    
  
    // Asignar el nuevo ID al servicio
    this.jsonConnectService.id = this.nuevoId;
  
    // Asignar otros valores al servicio
   
  
    if (menuElement && this.foto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          this.photoURL = event.target.result as string;
          menuElement.style.backgroundImage = `url(${this.photoURL})`;
          this.jsonConnectService.img = (this.photoURL as string);
  
        
        }
      };
  
      reader.readAsDataURL(this.foto);
    }
  }


  RETURN(): File | null {
    return this.foto;
  }
  GetURL(): string | null {
    const foto = this.RETURN();
  
    if (foto) {
      return URL.createObjectURL(foto);
    }
  
    return null;
  }
  POST() {
    const title = document.getElementById("title") as HTMLInputElement;
    const link = document.getElementById("link") as HTMLInputElement;
    this.jsonConnectService.title = title.value;
    this.jsonConnectService.url = link.value;
    // Obtener la lista actual de posts del localStorage
    const storedPosts = localStorage.getItem('posts');
    const localPosts = storedPosts ? JSON.parse(storedPosts) : [];
  
    // Calcular el nuevo ID como el número total de posts + 1
    this.nuevoId = localPosts.length + 1;
    this.jsonConnectService.id = this.nuevoId;

    const nuevoPost = {
      url: this.jsonConnectService.url,
      title: this.jsonConnectService.title,
      img: this.jsonConnectService.img,
      id: this.jsonConnectService.id
    };
    this.jsonConnectService.post.push(nuevoPost);
    console.log(this.jsonConnectService.post);
    localStorage.setItem('posts', JSON.stringify(this.jsonConnectService.post));   
    window.location.reload();
  }


}

