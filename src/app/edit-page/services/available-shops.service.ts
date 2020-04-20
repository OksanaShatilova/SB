import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Shop} from './shops.service';

@Injectable({
  providedIn: 'root'
})

export class AvailableShopsService {
  public availableShops$ = new Subject<Shop[]>();
  setAvailableShops(shops: Shop[]) {
    this.availableShops$.next(shops);
  }
}
