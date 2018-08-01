import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PerfilProfissionalPage } from '../perfil-profissional/perfil-profissional';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-convidar-profissional',
  templateUrl: 'convidar-profissional.html',
})
export class ConvidarProfissionalPage {
  categoriaProfissional: any;
  subCategoriaProfissional: any;
  nomeServico: any;
  orcamento: any;
  tipoPagamento: any;
  disponibilidade: any;
  workers: any;
  userId: any;
  workerId: any;
  pageId = "profissional";
  prof: any;
  
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http,  private _sanitizer: DomSanitizer, private storage: Storage) {
    this.categoriaProfissional = this.navParams.get("categoriaProfissional");
    this.subCategoriaProfissional = this.navParams.get("subCategoriaProfissional");
    this.nomeServico = this.navParams.get("nomeServico");
    this.orcamento = this.navParams.get("orcamento");
    this.tipoPagamento = this.navParams.get("tipoPagamento");
    this.disponibilidade = this.navParams.get("disponibilidade");

    this.storage.get('meuid').then((val) => {
      console.log('Id', val);
      this.userId= val;
    });
  }
  
  log(valor){
    console.log(valor);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvidarProfissionalPage');
    this.getWorkers();
  }

  getWorkers(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    let body = {
      data: true
    }

    let link = 'https://wa-studio.com/use/usuarios/getWorkers';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.workers = data;
      });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  goPerfilProfissional(id){
    this.navCtrl.push(PerfilProfissionalPage, {id: id});
  }

  getWorkerId(id){
    this.workerId = id;
  }

  alterarTab(id){
    this.pageId = id;
  }

  getProfissional(id){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    let body = {
      id: id
    }

    let link = 'https://wa-studio.com/use/usuarios/getProfissional';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        if(data){
          this.prof = data;
          console.log(data);
        }
      });
  }
  publicar(categoriaProfissional,subCategoriaProfissional,nomeServico,orcamento,tipoPagamento,disponibilidade){
   console.log(this.prof.id);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    
    let body = {
      categoriaProfissional : categoriaProfissional,
      subCategoriaProfissional : subCategoriaProfissional,
      nomeServico : nomeServico,
      orcamento : orcamento ,
      tipoPagamento : tipoPagamento,
      disponibilidade : disponibilidade,
      idTrabalhador : this.prof.id,
      idEmissor : this.userId,
    }
  
    let link = 'https://wa-studio.com/use/usuarios/publicar';
  
    this.http.post(link, JSON.stringify(body), { headers: headers })
    .map(res => res.json())
    .subscribe(data => {
      if(data){
        this.storage.set('categoriaProfissional', data.categoriaProfissional);
        this.storage.set('subCategoriaProfissional', data.subCategoriaProfissional);
        this.storage.set('nomeServico', data.nomeServico);
        this.storage.set('orcamento', data.orcamento);
        this.storage.set('tipoPagamento', data.tipoPagamento);
        this.storage.set('disponibilidade', data.disponibilidade);
      }
      console.log(data);
    });
  
  
    if(this.workerId){
      this.getProfissional(this.workerId);  
      this.alterarTab('publicacao');
    }
    else{ 
      let alert = this.alertCtrl.create({
        title: 'Trabalhador não selecionado',
        subTitle: 'Selecione um trabalhador para continuar',
        buttons: ['Ok']
      });
      alert.present();

    }
    
  }
  public goPage(page){
    console.log(page);
    this.navCtrl.push(page, {
      
    });
    
  }
  public idcapacete(){
    
  }
  // publicar(){
  //   if(this.workerId){
  //     this.getProfissional(this.workerId);  
  //     this.alterarTab('publicacao');
  //   }
  //   else{ 
  //     let alert = this.alertCtrl.create({
  //       title: 'Trabalhador não selecionado',
  //       subTitle: 'Selecione um trabalhador para continuar',
  //       buttons: ['Ok']
  //     });
  //     alert.present();

  //   }
  // }
  
  

}
