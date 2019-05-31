import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from './UserInfo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private log_Reg_Container: boolean = true;
  private map_Container: boolean = false;
  private username: string;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log(localStorage.username)
    if (localStorage.username != null) {
      this.log_Reg_Container = false;
      this.map_Container = true;

      this.username = localStorage.username;
    }
  }

  register_User_handler(log: string, pass, string): boolean {

    this.http
      .post('https://3000-a13f89fb-6965-4772-8fb3-02d380eaf668.ws-eu0.gitpod.io/register', JSON.stringify({ login: log, password: pass }))
      .subscribe(data => {
      });

    return true;

  }

  hide_Show_Handler_Form_Map(): void {
    this.log_Reg_Container = false;
    this.map_Container = true;
  }

  log_User_handler(log: string, pass, string): void {
    this.http
      .get<UserInfo>('https://3000-a13f89fb-6965-4772-8fb3-02d380eaf668.ws-eu0.gitpod.io/login/' + log + '/' + pass)
      .subscribe(data => {
        if (data != null) {
          this.hide_Show_Handler_Form_Map();
          this.username = log;
          localStorage.setItem('username', this.username)
        }

      });
  }
  logout(): void {
    localStorage.removeItem('username');
    this.log_Reg_Container = true;
    this.map_Container = false;
    window.location.reload();

  }

}
