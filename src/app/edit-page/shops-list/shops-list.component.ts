import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Shop} from '../services/shops.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {
  availableShops: Shop[];
  @Input() disabledList: boolean;
  @Output() onShopAdd: EventEmitter<Shop> = new EventEmitter<Shop>();
  @Output() onAvailableShopsChanged: EventEmitter<Shop[]> = new EventEmitter<Shop[]>();
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.availableShops = data.shops
      this.onAvailableShopsChanged.emit(this.availableShops);
    });
  }

  addShopToSpecialist(newShop: Shop) {
    this.onShopAdd.emit(newShop);
    this.availableShops = this.availableShops.filter(shop => {
     return shop.id !== newShop.id;
    });
    this.onAvailableShopsChanged.emit(this.availableShops);
  }
}
