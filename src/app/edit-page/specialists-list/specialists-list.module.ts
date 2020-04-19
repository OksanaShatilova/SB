import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpecialistsListComponent} from './specialists-list.component';
import { SpecialistTabComponent } from './specialist-tab/specialist-tab.component';
import { SpecialistInfoComponent } from './specialist-info/specialist-info.component';
import {SharedModule} from '../shared/shared.module';
import { NewSpecialistsComponent } from './new-specialists/new-specialists.component';


@NgModule({
  declarations: [
    SpecialistsListComponent,
    SpecialistTabComponent,
    SpecialistInfoComponent,
    NewSpecialistsComponent,
  ],
  exports: [
    SpecialistsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SpecialistsListModule { }
