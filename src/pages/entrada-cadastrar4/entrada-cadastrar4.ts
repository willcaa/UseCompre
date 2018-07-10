import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  imagem:any;
  foto:any;
  constructor(public camera:Camera ,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }
  getFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto = imageData;
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'imagem invalida',
        subTitle: 'Por favor selecione uma imagem valida',
        buttons: ['Ok']
      });
      alert.present();
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EntradaCadastrar4Page');
  }
    atualizaImagem(event){
      this.imagem = event.srcElement.files[0];
      this.navCtrl.push(event, {
        imagem: this.imagem,
           });
        }
  public goPage(page){
    if(this.categoriaProfissional && this.subCategoriaProfissional && this.nomeServico && this.orcamento && this.tipoPagamento && this.disponibilidade){
    this.navCtrl.push(page, {
      categoriaProfissional: this.categoriaProfissional, 
      subCategoriaProfissional: this.subCategoriaProfissional,
      nomeServico: this.nomeServico,
      orcamento: this.orcamento,
      tipoPagamento: this.tipoPagamento,
      disponibilidade: this.disponibilidade
    });
  }
  else{ 
    let alert = this.alertCtrl.create({
      title: 'Campo vazio',
      subTitle: 'Preencha todos os campos para continuar',
      buttons: ['Ok']
    });
    alert.present();
  }
}
}
