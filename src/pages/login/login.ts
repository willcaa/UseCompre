import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { User } from '../../providers';
import { MainPage } from '../';
import { SignupPage } from '../';
import { ContentPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  isLoggedIn:boolean = false;
  users: any;
  destination: string;
  start: string;
  data:any = {};
  loginId: number;
  tabId: string = 'entrar';
    // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, senha: string } = {
    email: 'test@example.com',
    senha: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController, public user: User, public translateService: TranslateService, public toastCtrl: ToastController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, private fb: Facebook, private storage: Storage) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.http = http;
    this.start = "";
    this.destination = "";
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }
  
  async clearStorage(){
    this.storage.clear();
    this.storage.get('meuid').then((val)=>{
      console.log(val);
    })
  }

 public alterarTab(id: string){
    this.tabId= id;
    console.log(this.tabId);
  }


  cadastrar(email, nome, imagem) {
   
      let headerx = new Headers();
      headerx.append('Access-Control-Allow-Origin', '*');
      headerx.append('Accept', 'application/json');
      headerx.append('content-type', 'application/json');
      var myData = JSON.stringify({email: email, nome: nome, imagem: imagem});
      var link = 'https://wa-studio.com/use/usuarios/cadastrar';
  
      this.http.post(link, myData, { headers: headerx })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data.id);
          if ( data ) {
            this.storage.set('nome', data.nome);
            this.storage.set('email', data.email);
            this.storage.set('imagem', data.user_image);
            this.storage.set('meuid', data.id);
            this.storage.get('meuid').then((val) => {
              console.log('Id', val);
              this.loginId = val;
            });
             
            console.log("logado");
            this.navCtrl.push('ContentPage');
              
          };
          console.log(data);
        });
    
  }


  login() {
    let toasts = this.toastCtrl.create({
      message: "0",
      duration: 3000,
      position: 'top'
    });
    toasts.present();
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          let toast = this.toastCtrl.create({
            message: "1",
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);

        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Error logging into Facebook ' + e,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
     
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }
  loginemail(email,senha){
      let headerx = new Headers();
      headerx.append('Access-Control-Allow-Origin', '*');
      headerx.append('Accept', 'application/json');
      headerx.append('content-type', 'application/json');
      var myData = JSON.stringify({email: email, senha: senha});
      var link = 'https://wa-studio.com/use/usuarios/login';
  
      this.http.post(link, myData, { headers: headerx })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          if ( data ) {
            this.storage.set('email', data.usuario.email);
            this.storage.set('senha', data.usuario.senha);
            this.storage.set('meuid', data.usuario.id);
            this.storage.get('meuid').then((val) => {
              console.log('Id', val);
              this.navCtrl.push(ContentPage);
            });
          }
        });
      }
        

  getUserDetail(userid) {
    let toast = this.toastCtrl.create({
      message: "2",
      duration: 3000,
      position: 'top'
    });
    toast.present();

    this.fb.api("/"+userid+"/?fields=picture.width(9999).height(9999),id,email,name,gender",["public_profile"])
      .then(res => {
        this.users = res;
        this.cadastrar(this.users.email, this.users.name, this.users.picture.data.url);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad RegisterPage');
    // this.cadastrar();
  }
  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(ContentPage);
    }, (err) => {
      this.navCtrl.push(ContentPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}