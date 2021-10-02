import { Transaction } from './transaction.model';

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  balance?: number | string;
  imgPath: string;
  _id?: string;
  transactions?: Transaction[];
}
