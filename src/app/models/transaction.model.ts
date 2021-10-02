export interface Transaction {
  value: number | string;
  sender: string;
  senderProfile: string;
  _id?: string;
  userId: string;
}
