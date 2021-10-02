export interface Payment {
  value: string;
  sender: string;
  senderProfile: string;
  accepted: boolean;
  _id?: string;
}
