import { Injectable } from '@angular/core';
import { BDService } from './bd.service';
import { Target } from './bd.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSystemService {
  constructor(public bdService: BDService, public localStorage: LocalStorageService) {}

  createTarget(img: string, name: string, url: string): void {
    var id: number;

    const targetLengthString = this.localStorage.get('targets');

    if(targetLengthString !== null){
      if(targetLengthString.length <= this.bdService.datos.length){
        id = this.bdService.datos.length + 1
      }else{
        id = targetLengthString.length + 1
      }
    }else{
      id = 1
    }

    const targetDates = { img: img, name: name, url: url, id: id };

    if (img && name && url && id) {
      this.bdService.datos.push(new Target(img, name, url, id));
    } else {
      const arraySafeDates: Array<string | number> = Object.keys(targetDates).map((key) => {
        switch (key as keyof typeof targetDates) {
          case 'img':
            return img || '../../assets/defaultPost.webp';
          case 'name':
            return name || 'New Target';
          case 'url':
            return url || '';
          case 'id':
            return id;
          default:
            return targetDates[key as keyof typeof targetDates];
        }
      });

      this.bdService.datos.push({
        img: arraySafeDates[0] as string,
        name: arraySafeDates[1] as string,
        url: arraySafeDates[2] as string,
        id: arraySafeDates[3] as number,
    

      });
    }
    
    console.log(id)
    this.localStorage.set('targets', this.bdService.datos);


  }
}
