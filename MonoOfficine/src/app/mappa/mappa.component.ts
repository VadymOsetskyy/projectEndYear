import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Monopatine } from './monomapite.model';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import {User_Pos} from './user_pos.model';

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {
  @ViewChild('timer') timer: ElementRef;
  private timeIn: string;
  private timeF: string;
  private user_pos:User_Pos = new User_Pos();
  private monopatiniIdUso: number;
  private biciInuso: boolean = false;
  private monopatini = Array<Monopatine>();
  private iconInfo = {
    url: 'https://cdn1.iconfinder.com/data/icons/transportation-symbol/91/transportation_a-25-512.png',
    scaledSize: {
      width: 40,
      height: 40
    }
  };
  elementType: 'url' | 'canvas' | 'img' = 'url';
  constructor(public http: HttpClient, private socket: Socket, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

    this.get_User_Position();

    this.get_Monopatini();

    this.socket.on('biciPrenotata', (msg) => {
      console.log(msg)

    });
  }
  latitude = 45.464211;
  mapType = 'roadmap';
  longitude = 9.191383;
  get_Monopatini(): void {
    this.http
      .get<Monopatine[]>('https://3000-a13f89fb-6965-4772-8fb3-02d380eaf668.ws-eu0.gitpod.io/getMonopatini')
      .subscribe(data => {
        this.monopatini = data;
        console.log(this.monopatini)
      });
  }

  prenotaBici(id: number): void {
    if (this.biciInuso != true) {

      this.ge_time_inizio();
      this.monopatiniIdUso = id;
      this.socket.emit('biciRent', { id: id });
    }
  }
  fineNolBici(id: number): void {
    this.ge_time_fine(id);
  }

  ge_time_inizio(): void {

    this.biciInuso = true;
    var d = new Date();
    this.timeIn = '' + d;
  }

  ge_time_fine(id: number): void {

    this.biciInuso = false;
    var d = new Date();
    this.timeF = '' + d;
    console.log(this.timeIn.toString().split(',')[0])
    this.socket.emit('fineNolleggio', { infoNol: { User: localStorage.getItem('username'), dataIn: this.timeIn.toString().split(',')[0], dataFi: this.timeF.toString().split(',')[1], oraIn: this.timeIn.toString().split(',')[1], oraFi: this.timeF.toString().split(',')[1] }, _id: id })

  }

get_User_Position():void{
  navigator.geolocation.watchPosition((pos: Position) => {
        this.user_pos.latitude=pos.coords.latitude;
        this.user_pos.longitude=pos.coords.longitude;
      })
}

}
