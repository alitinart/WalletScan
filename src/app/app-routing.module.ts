import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'qr-code',
    loadChildren: () =>
      import('./qr-code/qr-code.module').then((m) => m.QrCodePageModule),
  },

  {
    path: 'scan-qr',
    loadChildren: () =>
      import('./scan-qr/scan-qr.module').then((m) => m.ScanQRPageModule),
  },  {
    path: 'address-setter',
    loadChildren: () => import('./address-setter/address-setter.module').then( m => m.AddressSetterPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
