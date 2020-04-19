import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Specialist, SpecialistService} from './specialists.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class SpecialistsResolver implements Resolve<Specialist[]> {
  constructor(private specialistService: SpecialistService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Specialist[]> | Promise<Specialist[]> | Specialist[] {
    return this.specialistService.getSpecialists();
  }

}
