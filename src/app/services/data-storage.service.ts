import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from '../models/payment.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public loggedUser = new BehaviorSubject<User>({
    firstName: 'null',
    lastName: 'null',
    userName: 'null',
    balance: 0,
    transactions: [],
    imgPath: 'test',
    password: '123',
  });
  public newTransaction = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {}

  onSignUp(body: User) {
    return this.http.post('http://192.168.178.79:3000/users/', body);
  }

  onLogin(userName: string) {
    return this.http.get(`http://192.168.178.79:3000/users/${userName}`);
  }

  fetchUsers() {
    return this.http.get(`http://192.168.178.79:3000/users/`);
  }

  onDelete(id: string) {
    return this.http.delete(`http://192.168.178.79:3000/users/${id}`);
  }

  onGeneratePayment(body: Payment) {
    return this.http.post('http://192.168.178.79:3000/payments/', body);
  }

  getPayment(id: string) {
    return this.http.get(`http://192.168.178.79:3000/payments/${id}`);
  }

  getPayments() {
    return this.http.get('http://192.168.178.79:3000/payments/');
  }

  onPaymentAccepted(id: string, body: any) {
    return this.http.patch(`http://192.168.178.79:3000/payments/${id}`, body);
  }

  onPaymentAcceptedUser(id: string, body: any) {
    return this.http.patch(`http://192.168.178.79:3000/users/${id}`, body);
  }

  getUser(id: string) {
    return this.http.get(`http://192.168.178.79:3000/users/${id}`);
  }

  onTransaction(body: Transaction, userId: string) {
    return this.http.post(
      `http://192.168.178.79:3000/users/${userId}/transactions`,
      body
    );
  }

  fetchTransactions(userId: string) {
    return this.http.get(
      `http://192.168.178.79:3000/users/${userId}/transactions`
    );
  }
}
