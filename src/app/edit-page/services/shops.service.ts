import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Shop {
  id: number;
  name: string;
  address: string;
}

@Injectable({providedIn: 'root'})
export class ShopService {
  shops: Shop[] = [
    {id: 1, name: 'Магазин SBS Москва', address: 'Россия, г. Москва, Бутырская 77'},
    {id: 2, name: 'Магазин SBS Санкт-Петербург', address: 'Россия, г. Санкт-Петербург, Бутырская 77'},
    {id: 3, name: 'Магазин SBS Томск', address: 'Россия, г. Томск, Бутырская 77'},
    {id: 4, name: 'Магазин SBS Коломна', address: 'Россия, г. Коломна, Бутырская 77'},
    {id: 5, name: 'Магазин SBS Тверь', address: 'Россия, г. Тверь, Бутырская 77'},
    {id: 6, name: 'Магазин SBS Калуга', address: 'Россия, г. Калуга, Бутырская 77'},
    {id: 7, name: 'Магазин SBS Сыктывкар', address: 'Россия, г. Сыктывкар, Бутырская 77'},
    {id: 8, name: 'Магазин SBS Сочи', address: 'Россия, г. Сочи, Бутырская 77'},
    {id: 9, name: 'Магазин SBS Астана', address: 'Россия, г. Астана, Бутырская 77'},
    {id: 10, name: 'Магазин SBS Минск', address: 'Россия, г. Минск, Бутырская 77'},
  ]
  constructor() {}

  getShops(): Observable<Shop[]> {
    return of(this.shops);
  }
}
