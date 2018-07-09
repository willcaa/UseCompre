import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';



@IonicPage()
@Component({
  selector: 'page-perfil-profissional',
  templateUrl: 'perfil-profissional.html',
})
export class PerfilProfissionalPage {
  profId: any;
  profissional: any;
  imagemProfissional: any;
  estrelas:any;
  nome: any;
  pageId: any;
  descricao: any;
  concluidos: any;
  buttonColor:any;
  buttonColor2:any;
  buttonColor3:any;
  buttonColor4:any;
  isso:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.profId = this.navParams.get("id");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilProfissionalPage');
    this.getProfissional(this.profId);
  }

  public alterarTab(id){
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

    let link = 'https://bluedropsproducts.com/use/usuarios/getProfissional';
    
    this.http.post(link, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        if(data){
          console.log(data);
          this.estrelas = data.estrelas;
          this.imagemProfissional = data.img;
          this.nome = data.nome;
          this.descricao = data.descricao;
          
        }
      });
  }
   goPage(page){
    this.navCtrl.push(page, {
      
    });
    
  }
//   btnArray = 
// [
//     {
//         "title":"Btn1",
//         "backgroudColor":"#ff00ff"
//     },
//     {
//         "title":"Btn2",
//         "backgroudColor":"#ff00ff"
//     },
//     {
//         "title":"Btn3",
//         "backgroudColor":"#ff00ff"
//     }
// ]
// btnActivate(ind)
// {
//     this.btnArray[ind]['backgroudColor'] = "#000";
// }
addEvent(){
  this.buttonColor = '#000'; 
  this.buttonColor2 = '#fff';
  this.buttonColor3 = '#fff';
  this.buttonColor4 = '#fff';
 
  }
Event2(){
  this.buttonColor = '#fff'; 
  this.buttonColor2 = '#000';
  this.buttonColor3 = '#fff';
  this.buttonColor4 = '#fff'; 
  
 
  }
Event3(){
  this.buttonColor = '#fff'; 
  this.buttonColor2 = '#fff';
  this.buttonColor3 = '#000';
  this.buttonColor4 = '#fff'; 
  
 
  }
Event4(){
  this.buttonColor = '#fff'; 
  this.buttonColor2 = '#fff';
  this.buttonColor3 = '#fff';
  this.buttonColor4 = '#000'; 
  
 
  }

alterar(){
  this.isso = 'none'; 
  
 
  }
 
}
