import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', loadChildren: () => import('./edit-page/edit-page.module').then(m => m.EditPageModule)},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {}
