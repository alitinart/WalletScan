/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models/user.model';
import { DataStorageService } from '../services/data-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLoggedIn: boolean;
  isSignUp = true;

  // User Info

  firstName = '';
  lastName = '';
  userName = '';
  password = '';
  retypePassword = '';
  imgPath = 'test';

  // User Login

  userNameLogin = '';
  passwordLogin = '';

  // User

  loggedUser: User;

  // File

  fileSelected: Blob;
  imageUrl: any;
  base64: string;
  imagePicked = false;

  constructor(
    private dataStorage: DataStorageService,
    private sant: DomSanitizer,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.dataStorage.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.loggedUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  changeOption() {
    this.isSignUp = !this.isSignUp;
  }

  onLogout() {
    localStorage.removeItem('user');
    this.dataStorage.isLoggedIn.next(false);
    this.isLoggedIn = false;
  }

  onLogin() {
    let pickedUser: User;

    console.log(this.userNameLogin);

    this.dataStorage.onLogin(this.userNameLogin).subscribe(
      (resData: User) => {
        console.log(resData);
        pickedUser = resData;
        if (pickedUser.password === this.passwordLogin) {
          this.isLoggedIn = true;
          this.dataStorage.isLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(pickedUser));
          this.loggedUser = pickedUser;
          this.dataStorage.loggedUser.next(this.loggedUser);
        } else {
          alert('The password entered is incorrect');
        }
      },
      (error) => {
        alert('Username or Password is incorrect');
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure you want to delete your account ?',
      // eslint-disable-next-line @typescript-eslint/quotes
      message:
        // eslint-disable-next-line @typescript-eslint/quotes
        "If you <strong>Delete</strong> your account you won't be able to get back your account",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            this.dataStorage
              // eslint-disable-next-line no-underscore-dangle
              .onDelete(this.loggedUser._id)
              .subscribe((resData) => {
                console.log(resData);
                this.isLoggedIn = false;
                this.dataStorage.isLoggedIn.next(false);
                localStorage.removeItem('user');
              });
          },
        },
      ],
    });

    await alert.present();
  }
  onDelete() {
    this.presentAlertConfirm();
  }

  onSelectNewFile(files: any) {
    const fileList = files.files;

    this.fileSelected = fileList[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.fileSelected) as string
    );
    this.base64 = '';
    this.imagePicked = true;
    this.convertToBase();
  }

  convertToBase() {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      this.imgPath = this.base64;
    };
  }

  onSignUp() {
    if (this.retypePassword === this.password) {
      if (this.imageUrl === undefined) {
        this.base64 =
          'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
      } else {
        this.convertToBase();
      }
      const user: User = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        password: this.password,
        balance: '0',
        imgPath: this.base64,
      };

      this.dataStorage.fetchUsers().subscribe(
        (users: User[]) => {
          const isUserName = users.find(
            (userPicked) => userPicked.userName === this.userName
          );

          if (isUserName) {
            alert('There is already a account with that username');
          } else {
            this.dataStorage.onSignUp(user).subscribe((resData: User) => {
              console.log(resData);
              localStorage.setItem('user', JSON.stringify(resData));
              this.dataStorage.isLoggedIn.next(true);
              this.loggedUser = resData;
            });
          }
        },
        (error) => {
          alert('Choose smaller image');
        }
      );
    } else {
      alert('Password do not match');
    }
  }
}
