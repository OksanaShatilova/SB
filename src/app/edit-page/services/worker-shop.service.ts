import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {WorkerShopRequestItem} from '../edit-page.module';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WorkerShopService {
  url = '';
  constructor(private http: HttpClient) {}

  submit(data: WorkerShopRequestItem[]): Observable<WorkerShopRequestItem[]> {
    console.log('Отправляемые данные', data);
    return this.http.post<WorkerShopRequestItem[]>(this.url, data);
  }
}
