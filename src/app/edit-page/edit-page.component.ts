import {Component, OnDestroy} from '@angular/core';
import {Shop} from './services/shops.service';
import {Specialist} from './services/specialists.service';
import {Result, WorkerShopRequestItem} from './edit-page.module';
import {WorkerShopService} from './services/worker-shop.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnDestroy {
  workerShopSubscription: Subscription
  disabledList: boolean;
  disabledButton: boolean;
  currentSpecialist: Specialist;
  result: Specialist[];
  availableShops: Shop[];
  workerShopRequest: WorkerShopRequestItem[];
  constructor(private workerShopService: WorkerShopService) { }
  disableShopsList(hiddenList: boolean) {
    this.disabledList = !hiddenList;
  }

  addCurrentSpecialistShop(shop: Shop) {
    this.currentSpecialist.shops.push(shop);
  }

  updateCurrentSpecialist(specialist: Specialist) {
    this.currentSpecialist = specialist;
  }

  removeCurrentSpecialistShop(deletingShop: Shop) {
    this.currentSpecialist.shops = this.currentSpecialist.shops.filter(shop => {
      return shop.id !== deletingShop.id;
    });
    this.availableShops.unshift(deletingShop);
  }

  updateAvailableShopsList(shops: Shop[]) {
    this.availableShops = shops;
  }

  updateShopsList(specialist: Specialist) {
    this.availableShops.unshift(...specialist.shops);
  }

  prepareWorkerShopRequest() {
    this.workerShopRequest = this.result.map(item => {
      const shops = item.shops.map(shop => {
        return shop.id;
      });
      return {
        specialistId: item.id,
        shopsId: shops
      };
    });
  }

  createWorkerShopRequest() {
    this.disabledButton = true;
    this.prepareWorkerShopRequest()
    this.workerShopSubscription = this.workerShopService.submit(this.workerShopRequest)
      .subscribe(() => {
        this.disabledButton = false;
        alert('Данные успешно отправлены');
      }, error => {
        this.disabledButton = false;
        alert(`Произошла ошибка ${error.status}`);
      });
  }

  updateResult(result: Result) {
    this.result = [...result.availableSpecialists, ...result.addedSpecialists];
  }

  ngOnDestroy(): void {
    this.workerShopSubscription.unsubscribe();
  }
}
