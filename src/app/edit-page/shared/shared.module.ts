import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopItemComponent} from './components/shop-item/shop-item.component';

@NgModule({
  declarations: [
    ShopItemComponent
  ],
  exports: [
    ShopItemComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {}
