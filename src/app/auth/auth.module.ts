import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NoticiaIdComponent } from './pages/noticia-id/noticia-id.component';
import { AgregaNoticiaComponent } from './pages/agrega-noticia/agrega-noticia.component';


@NgModule({
  declarations: [
    LoginPagesComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    NoticiasComponent,
    NoticiaIdComponent,
    AgregaNoticiaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
