import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment.model';
import { User } from '../models/user.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  qrCodeText: string;
  loggedUser: User;
  valueOfPayment = '';
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.dataStorage.loggedUser.subscribe((user) => {
      this.loggedUser = user;
    });
  }

  generatePayment() {
    if (this.valueOfPayment === '') {
      return;
    } else if (this.valueOfPayment > this.loggedUser.balance) {
      alert('You do not have enough funds to make this code.');
    } else {
      this.loggedUser.balance = +this.loggedUser.balance - +this.valueOfPayment;
      this.dataStorage.loggedUser.next(this.loggedUser);
      localStorage.setItem('user', JSON.stringify(this.loggedUser));
      this.dataStorage
        // eslint-disable-next-line no-underscore-dangle
        .onPaymentAcceptedUser(this.loggedUser._id, {
          balance: this.loggedUser.balance,
        })
        .subscribe((resData) => {
          console.log(resData);
        });
      let id: number;
      this.dataStorage
        .onGeneratePayment({
          value: this.valueOfPayment,
          sender: this.loggedUser.userName,
          senderProfile: this.loggedUser.imgPath,
          accepted: false,
        })
        .subscribe((resData: Payment) => {
          console.log(resData);
          // eslint-disable-next-line no-underscore-dangle
          this.qrCodeText = resData._id;
        });
    }
  }
}
