import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import jsonData from '../../assets/data/us-state.json';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getMapData(): Observable<any> {
    return of(jsonData);
  }
}
