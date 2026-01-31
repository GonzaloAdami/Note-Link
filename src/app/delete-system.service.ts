import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteSystemService {

  constructor() { }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
    console.log(key)
  }
  
}
