/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { Payment } from '../models/payment.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  paymentReceived: Payment;
  loggedUser: User;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataStorage: DataStorageService,
    private router: Router
  ) {}

  openQR() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData.text);
        this.scannedData = barcodeData.text;
        console.log(this.scannedData);
        this.dataStorage
          .getPayment(this.scannedData)
          .subscribe((payment: Payment) => {
            if (payment[0].accepted === false) {
              this.paymentReceived = payment[0];
            } else {
              alert('This code has already been claimed !');
              this.paymentReceived = null;
              this.router.navigate(['/']);
            }
          });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  onAccept() {
    this.dataStorage
      .onPaymentAccepted(this.paymentReceived._id, {
        accepted: true,
      })
      .subscribe(
        (resData) => {
          this.loggedUser = JSON.parse(localStorage.getItem('user'));
          const transaction: Transaction = {
            value: this.paymentReceived.value,
            sender: this.paymentReceived.sender,
            senderProfile: this.paymentReceived.senderProfile,
            userId: this.loggedUser._id,
          };
          this.loggedUser.transactions.unshift(transaction);
          const user: User = {
            firstName: this.loggedUser.firstName,
            lastName: this.loggedUser.lastName,
            userName: this.loggedUser.userName,
            password: this.loggedUser.password,
            balance: +this.loggedUser.balance + +this.paymentReceived.value,
            imgPath: this.loggedUser.imgPath,
            _id: this.loggedUser._id,
            transactions: this.loggedUser.transactions,
          };
          console.log(resData);
          console.log(user);

          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user));

          this.loggedUser = user;

          this.dataStorage.loggedUser.next(user);

          this.dataStorage
            .onTransaction(transaction, this.loggedUser._id)
            .subscribe((transactions) => {
              console.log(transactions);
              this.dataStorage.newTransaction.next(true);
            });

          this.paymentReceived = null;

          this.dataStorage
            .onPaymentAcceptedUser(this.loggedUser._id, {
              balance: user.balance,
            })
            .subscribe((responseData) => {
              console.log(responseData);
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.dataStorage.loggedUser.subscribe((user) => {
      this.loggedUser = user;
    });
  }
}
