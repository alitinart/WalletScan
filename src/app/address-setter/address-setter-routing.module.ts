import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressSetterPage } from './address-setter.page';

const routes: Routes = [
  {
    path: '',
    component: AddressSetterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressSetterPageRoutingModule {}
