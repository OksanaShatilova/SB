import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {EditPageComponent} from './edit-page.component';
import {SpecialistsListModule} from './specialists-list/specialists-list.module';
import {ShopsListModule} from './shops-list/shops-list.module';
import {SpecialistsResolver} from './services/specialists.resolver';
import {ShopsResolver} from './services/shops.resolver';
import {Specialist} from './services/specialists.service';
import {BrowserModule} from '@angular/platform-browser';


export interface Result {
  availableSpecialists: Specialist[];
  addedSpecialists: Specialist[];
}

export interface WorkerShopRequestItem {
  specialistId: number;
  shopsId: number[];
}

@NgModule({
  declarations: [
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    ShopsListModule,
    SpecialistsListModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPageComponent,
        resolve: {
          specialists: SpecialistsResolver,
          shops: ShopsResolver
        }
      }
    ])
  ]
})
export class EditPageModule { }
