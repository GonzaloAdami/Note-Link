import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BDService {

   datos: Array<Target> = [];
  constructor() { }
}

export class Target {
  public img: string;
  public name: string;
  public url: string;
  public id: number;


  constructor(img: string, name: string, url: string, id: number) {
    this.img = img;
    this.name = name;
    this.url = url;
    this.id = id;

}
}