import {Component} from '@angular/core';
import {Shop} from './services/shops.service';
import {Specialist} from './services/specialists.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {
  availableShops: Shop[];
  disabledList: boolean;
  currentSpecialist: Specialist;
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
}
