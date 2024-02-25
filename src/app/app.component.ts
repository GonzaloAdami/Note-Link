import { Component, Inject, OnInit } from '@angular/core';
import { SystemService } from './servicios/system.service';
import { JsonConnectService } from './servicios/json-connect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SystemService],
})
export class AppComponent implements OnInit {
  title = 'Note Link';
  public enlacesHabilitados: boolean = true;
  posts: any[] = [
    { id: '1', url: 'https://example.com', title: 'Example', img: 'example.jpg' },
    // Agrega más objetos según sea necesario
  ];

  constructor(
    @Inject(SystemService) public servicio: SystemService,
    @Inject(JsonConnectService) public JSONconnect: JsonConnectService
  ) {
    // Coneccion y manipulacion del JSON
    this.JSONconnect.getPosts();
  }

  ngOnInit(): void {}

  // Renderizar la foto

  savePOST() {
    // Obtener datos de localStorage
    const storedPosts = localStorage.getItem('posts');
    const localPosts = storedPosts ? JSON.parse(storedPosts) : [];

    // Convertir el objeto a una cadena JSON y mostrarlo en la consola
    console.log('El JSON está conformado de la siguiente forma ' + JSON.stringify(localPosts, null, 2));

    // Actualizar los posts en JSONconnect
    this.JSONconnect.post = [...localPosts];
  }



  toggleOverlay(postId: number) {
    // Deshabilitar los enlaces
    this.enlacesHabilitados = !this.enlacesHabilitados;
  
    const posts = document.getElementsByClassName('post');
    const hrefs: string[] = [];
  
    // Guardar los atributos href antes de eliminar los elementos
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i] as HTMLElement;
      const link = post.querySelector('a') as HTMLAnchorElement | null;
  
      if (link) {
        hrefs.push(link.href);
        link.removeAttribute('href');
      }
    }
  
    // Eliminar eventos antes de agregarlos de nuevo
    const handleClick = (event: MouseEvent) => this.handlePostClick(postId, event);
  
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i] as HTMLElement;
      post.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
      post.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
      post.removeEventListener('click', handleClick);
  
      post.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      post.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      post.addEventListener('click', handleClick);
    }
  
    // Restaurar los atributos href después de un tiempo (puedes ajustar el tiempo según tus necesidades)
    setTimeout(() => {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i] as HTMLElement;
        const link = post.querySelector('a') as HTMLAnchorElement | null;
  
        if (link && i < hrefs.length) {
          link.href = hrefs[i];
        }
      }
  
      // Volver a habilitar los enlaces
      this.enlacesHabilitados = true;
    }, 1000);
  }
  




  handleMouseEnter(event: MouseEvent) {
    const post = event.currentTarget as HTMLElement;
    post.classList.add('overlay');
  }

  handleMouseLeave(event: MouseEvent) {
    const post = event.currentTarget as HTMLElement;
    post.classList.remove('overlay');
  }

  handlePostClick(postId:number, event: MouseEvent) {
    event.stopPropagation();

    const post = event.currentTarget as HTMLElement;
    const clickedPostId = parseInt(post.id);

    const index = this.JSONconnect.post.findIndex(p => p.id === clickedPostId);

    if (index !== -1) {
      this.JSONconnect.post.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(this.JSONconnect.post));
    }

    post.remove();
    window.location.reload();
  }
}
