import {Component, OnDestroy, OnInit} from '@angular/core';
import {Shop} from './services/shops.service';
import {Specialist} from './services/specialists.service';
import {Result, WorkerShopRequestItem} from './edit-page.module';
import {WorkerShopService} from './services/worker-shop.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  allShops: Shop[];
  routeSubscription: Subscription;
  workerShopSubscription: Subscription
  disabledList: boolean;
  disabledButton: boolean;
  currentSpecialist: Specialist;
  result: Specialist[];
  availableShops: Shop[];
  workerShopRequest: WorkerShopRequestItem[];
  constructor(
    private workerShopService: WorkerShopService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.allShops = data.shops;
      this.availableShops = data.shops;
    });
  }

  disableShopsList(hiddenList: boolean) {
    this.disabledList = !hiddenList;
  }

  addCurrentSpecialistShop(shop: Shop) {
    this.currentSpecialist.shops.push(shop);
  }

  updateCurrentSpecialist(specialist: Specialist) {
    this.currentSpecialist = specialist;
    this.availableShops = this.updateShopsList(specialist);
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
    if (specialist) {
      return this.availableShops = this.allShops.filter(shop => {
        const condition = specialist.shops.some(addedShop => {
          return addedShop.id === shop.id;
        });
        return !condition;
      });
    } else {
      this.resetShopListToDefault();
      this.disabledList = true;
    }
  }

  prepareWorkerShopRequest() {
    this.workerShopRequest = [];
    this.result.forEach(item => {
      item.shops.forEach(shop => {
        this.workerShopRequest.push({
          specialistId: item.id,
          shopId: shop.id
        });
      });
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

  resetShopListToDefault() {
    this.availableShops = this.allShops;
  }
}
