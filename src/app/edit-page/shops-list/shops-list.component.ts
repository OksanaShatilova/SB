import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Shop} from '../services/shops.service';
import {Specialist} from '../services/specialists.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent {
  @Input() currentSpecialist: Specialist;
  @Input() availableShops: Shop[];
  @Input() disabledList: boolean;
  @Output() onShopAdd: EventEmitter<Shop> = new EventEmitter<Shop>();
  @Output() onAvailableShopsChanged: EventEmitter<Shop[]> = new EventEmitter<Shop[]>();
  constructor() {}

  addShopToSpecialist(newShop: Shop) {
    this.onShopAdd.emit(newShop);
    this.availableShops = this.availableShops.filter(shop => {
     return shop.id !== newShop.id;
    });
    this.onAvailableShopsChanged.emit(this.availableShops);
  }
}
