/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  loggedUser: User;
  areTransactions: any;
  transactions: Transaction[] = [];

  constructor(
    private dataStorage: DataStorageService,
    private router: Router
  ) {}

  doRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.dataStorage.isLoggedIn.subscribe((resData) => {
      this.isLoggedIn = resData;
    });
    if (this.isLoggedIn) {
      this.dataStorage.loggedUser.subscribe((user) => {
        this.loggedUser = user;
      });
    } else {
      this.router.navigate(['/profile']);
    }
    this.dataStorage.newTransaction.subscribe(() => {
      this.dataStorage
        .fetchTransactions(this.loggedUser._id)
        .subscribe((transactions: Transaction[]) => {
          transactions.filter((transaction) => {
            if (transaction.userId === this.loggedUser._id) {
              console.log(transaction);
              this.transactions.unshift(transaction);
            }
          });
          console.log(this.transactions);
          this.loggedUser.transactions = this.transactions;
          localStorage.setItem('user', JSON.stringify(this.loggedUser));
        });
    });
    if (this.loggedUser.transactions.length < 1) {
      this.areTransactions = true;
    } else {
      this.areTransactions = false;
    }
  }
}
