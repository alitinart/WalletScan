import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressSetterPageRoutingModule } from './address-setter-routing.module';

import { AddressSetterPage } from './address-setter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressSetterPageRoutingModule
  ],
  declarations: [AddressSetterPage]
})
export class AddressSetterPageModule {}
