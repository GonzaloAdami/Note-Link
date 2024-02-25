import { Inject, Injectable, forwardRef  } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JsonConnectService {

  urlJson: string = 'assets/Data.json';
  url: string = "";
  title: string = "";
  img: string = "";
  id: number = 0;
  post: Array<{ url: string; title: string; img: string; id: number; }> = [];

  constructor(
  ) {
   
  }



 

  getPosts() {
    // Obtener datos de localStorage
    const storedPosts = localStorage.getItem('posts');
    const localPosts = storedPosts ? JSON.parse(storedPosts) : [];
  
    // Realizar la llamada a fetch para obtener datos del servidor
    fetch(this.urlJson)
      .then(response => response.json())
      .then(data => {
        // Combina los datos del servidor con los datos locales
        const combinedPosts = [...localPosts, ...data.post];
        
        // Actualiza this.post con los datos combinados
        this.post = combinedPosts;
  
        // Llama a renderPosts con los datos combinados
        this.renderPosts(combinedPosts);
      })
      .catch(error => {
        console.error('Error al obtener datos del servidor:', error);
        // En caso de error, utiliza solo los datos locales
        this.post = localPosts;
        this.renderPosts(localPosts);
      });
  }
  
  renderPosts(posts: { url: string; title: string; img: string; id: number}[]) {
    if (posts) {
      const postContainer = document.getElementById("post-container");
  
      posts.forEach(post => {
        // Estructura
        const url = post.url;
        const title = post.title;
        const img = post.img;
        const id = post.id
  
        // Contenedor principal
        const container = document.createElement("div");
        container.className = "post";
        container.style.backgroundImage = `url(${img})`;
        container.id =  id.toString();
  
        // Título del post
        const titleElement = document.createElement("h1");
        titleElement.textContent = title;
        titleElement.className = "post-title";
  
        // Enlace
        const urlPOST = document.createElement("a");
        urlPOST.href = url;
        urlPOST.target = "_blank";
        urlPOST.style.textDecoration = "none";
  
        // Empaquetado del post
        urlPOST.appendChild(container);
        container.appendChild(titleElement);
  
        // Publicar post
        postContainer?.appendChild(urlPOST);
      });
    } else {
      console.error('La variable posts es undefined.' + JSON.stringify(this.post));
    }
  }
  


  DELETE(postId: number): void {
    // Filtrar los posts para excluir el post con el id dado
    this.post = this.post.filter(post => post.id !== postId);
  
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('posts', JSON.stringify(this.post));
  
    // Renderizar los posts después de la eliminación
    this.renderPosts(this.post);
  }
}

