import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-guasto',
  templateUrl: './modal-guasto.component.html',
  styleUrls: ['./modal-guasto.component.css']
})
export class ModalGuastoComponent implements OnInit {
@Input()idMono;
  @Input() vistaModal;

  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  hideModal(){
    this.vistaModal='vistaModalHide'
    console.log(';sadasd')
    this.idMono=null;
  }

  segnalaGuasto(id:number,tipoGuasto:string){
    var d= new Date();
    this.http
      .post('https://3000-a13f89fb-6965-4772-8fb3-02d380eaf668.ws-eu0.gitpod.io/segnalaGuasto',{guasto:{User: localStorage.getItem('username'), dataSegnlazione: d.toString().split(',')[0], _id: id, tipoGuasto:tipoGuasto}})
      .subscribe(
      );
  }



}
