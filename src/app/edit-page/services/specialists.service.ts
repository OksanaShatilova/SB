import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Shop} from './shops.service';

export interface Specialist {
  id: number;
  fullName: string;
  photo: string;
  shops?: Shop[];
}

@Injectable({providedIn: 'root'})
export class SpecialistService {
  specialists: Specialist[] = [
    {id: 1, fullName: 'Аношкин Станислав Касьянович', photo: '../../../../assets/img/photo_1.png'},
    {id: 2, fullName: 'Бажанов Вячеслав Ираклиевич', photo: '../../../../assets/img/photo_2.png'},
    {id: 3, fullName: 'Игумнов Демьян Эмилевич', photo: '../../../../assets/img/photo_3.png'},
    {id: 4, fullName: 'Качусов Вячеслав Евстафиевич', photo: '../../../../assets/img/photo_4.png'},
    {id: 5, fullName: 'Ананьев Дмитрий Евстафиевич', photo: '../../../../assets/img/photo_5.png'},
    {id: 6, fullName: 'Соколова Полина Ильевна', photo: '../../../../assets/img/photo_6.png'},
    {id: 7, fullName: 'Малыхин Клавдий Святославович', photo: '../../../../assets/img/photo_7.png'}
  ];
  constructor() {}

  getSpecialists(): Observable<Specialist[]> {
    return of(this.specialists);
  }
}
