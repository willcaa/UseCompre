import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
interface PageItem {
  title: string
  component: any
}

type PageList = PageItem[]


@IonicPage()
@Component({
  selector: 'page-entrada-cadastrar4',
  templateUrl: 'entrada-cadastrar4.html',
})
export class EntradaCadastrar4Page {

  @ViewChild(Nav) nav: Nav;
  categoriaProfissional: any;
  subCategoriaProfissional: any;
  nomeServico: any;
  orcamento: any;
  tipoPagamento: any;
  disponibilidade: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntradaCadastrar4Page');
  }
  public goPage(page){
    this.navCtrl.push(page, {
      categoriaProfissional: this.categoriaProfissional, 
      subCategoriaProfissional: this.subCategoriaProfissional,
      nomeServico: this.nomeServico,
      orcamento: this.orcamento,
      tipoPagamento: this.tipoPagamento,
      disponibilidade: this.disponibilidade
    });
    
  }
}
