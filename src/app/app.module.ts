import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from "./components/carousel/carousel.component";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { UserNavBarComponent } from './components/user-nav-bar/user-nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { CommandsComponent } from './components/commands/commands.component';
import { FooterComponent } from './components/footer/footer.component';
import { OurUniversComponent } from './components/our-univers/our-univers.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientComponent } from './components/client/client.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavBarComponent,
    UserNavBarComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    HistoryComponent,
    CommandsComponent,
    FooterComponent,
    OurUniversComponent,
    ProjectsComponent,
    CarouselComponent,
    ClientComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
