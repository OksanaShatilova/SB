import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopsListComponent} from './shops-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ShopsListComponent
  ],
  exports: [
    ShopsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShopsListModule { }
