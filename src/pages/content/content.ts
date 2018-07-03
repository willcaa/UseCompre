import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EntradaCadastrar4Page } from '../';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController) { }

   goPage(page){
    this.navCtrl.push(page);
  }

}

