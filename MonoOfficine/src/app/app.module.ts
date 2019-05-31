import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { MappaComponent } from './mappa/mappa.component';
import { AgmCoreModule } from '@agm/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';
const config: SocketIoConfig = { url: 'https://5000-a13f89fb-6965-4772-8fb3-02d380eaf668.ws-eu0.gitpod.io/', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    MappaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzUI8LYmnHPyFrtRT8Q8IEREZfOygUl-U'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    }),
    NgxQRCodeModule,
    	SocketIoModule.forRoot(config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
