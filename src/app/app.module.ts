import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventualModule } from './inventual/inventual.module';
import { MatIconModule } from '@angular/material/icon';
import { ActivosProyectModule } from './ActivosComponent/activosProyect.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    InventualModule,
    ActivosProyectModule,
    MatIconModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
