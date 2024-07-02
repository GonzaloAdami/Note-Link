import { Injectable } from '@angular/core';
import { BDService, Target } from './bd.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(public bd: BDService) { }

  get(key: string): Target[] | null {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null; 
    } else {
      return JSON.parse(data) as Target[];
    }
  }

  set(key: string, data: Target[]): void {
    
    const existingData: Target[] | null = this.get(key); 
    const existingDataSafe: Target[] = existingData || [];
 
  data.map( items =>{ 
    const existing = existingDataSafe.find(existingItem => existingItem.id === items.id);
    if (!existing) {
      existingDataSafe.push(items); 
    }
  })
    const updatedData: Target[] = existingDataSafe;
  
    localStorage.setItem(key, JSON.stringify(updatedData));
    console.log(JSON.stringify(updatedData))
    console.log(JSON.stringify(data))
   
  }
  
  
  delete(key: string, id: number): void {
    const existingData: Target[] | null = this.get(key);
  
    if (!existingData) {
      console.log(`No data found for key: ${key}`);
      return;
    }
  
    const updatedData: Target[] = existingData.filter((item: Target) => item.id !== id);
  
    localStorage.setItem(key, JSON.stringify(updatedData));
    console.log("Antes : " + this.bd.datos)
    this.bd.datos = updatedData; 
    console.log("Despues : " + this.bd.datos)
  }
  

}
