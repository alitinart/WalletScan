import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private dataStorage: DataStorageService, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    const ipAddress = localStorage.getItem('ipAddress')

    if(ipAddress) {
      this.dataStorage.setIp(ipAddress)
    } else {
      this.router.navigate(['/address-setter'])
    }

    if (user) {
      this.dataStorage.isLoggedIn.next(true);
      this.dataStorage.loggedUser.next(user);
      this.isLoggedIn = true;
    } else {
      this.dataStorage.isLoggedIn.next(false);
      this.isLoggedIn = false;
    }

    this.dataStorage.isLoggedIn.subscribe((resData) => {
      this.isLoggedIn = resData;
    });
  }
}
