import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Importa Il modulo http

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "MonoOfficine";

    constructor() {
    }
}
