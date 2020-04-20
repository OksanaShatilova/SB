import {Component, Input} from '@angular/core';
import {Shop} from '../../../services/shops.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent {
  @Input() shop: Shop;
  constructor() { }
}
