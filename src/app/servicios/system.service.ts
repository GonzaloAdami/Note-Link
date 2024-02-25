import { Injectable } from '@angular/core';
import { HTTPServiceService } from '../servicios/httpservice.service';



@Injectable({
  providedIn: 'root'
})


export class SystemService {

  //VARIABLES
  showOverlay: boolean = true;  
  mostrarDiv: boolean = false;


  constructor(
    public HTTP: HTTPServiceService,
    
  ) { }


  //CREACION DE NUEVOS POSTS
 

  deletePOST() {
    let posts = document.getElementsByClassName("post");
    this.showOverlay = !this.showOverlay;
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i] as HTMLElement;
      post.classList.add("overlay");
    }
  }
  
  viewDATA(): void {
    console.log(
   
      "Nuevo post " + this.HTTP.jsonConnectService.post
    
    );
  
  }




}