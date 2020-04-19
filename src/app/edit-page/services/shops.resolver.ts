import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Shop, ShopService} from './shops.service';

@Injectable({providedIn: 'root'})

export class ShopsResolver implements Resolve<Shop[]> {
  constructor(private specialistService: ShopService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Shop[]> | Promise<Shop[]> | Shop[] {
    return this.specialistService.getShops();
  }
}
