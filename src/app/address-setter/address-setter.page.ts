import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-address-setter',
  templateUrl: './address-setter.page.html',
  styleUrls: ['./address-setter.page.scss'],
})
export class AddressSetterPage implements OnInit {

  ipAddress = ''

  constructor(private dataStorage: DataStorageService) { }

  onSetIpAddress() {
    localStorage.setItem('ipAddress', this.ipAddress)
    this.dataStorage.setIp(this.ipAddress)
    alert('Ip Address Succesfully Added')
  }

  ngOnInit() {
  }

}
