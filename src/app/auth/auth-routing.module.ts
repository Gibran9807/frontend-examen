import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NoticiaIdComponent } from './pages/noticia-id/noticia-id.component';
import { AgregaNoticiaComponent } from './pages/agrega-noticia/agrega-noticia.component';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {
        path: 'login', component: LoginPagesComponent
      },
      {
        path: 'register', component: RegisterPageComponent
      },
      {
        path: 'noticias', component: NoticiasComponent
      },
      {
        path: 'noticias/:id', component: NoticiaIdComponent
      },
      {
        path: 'agregarnoticia',
        canActivate: [isAuthenticatedGuard],
        component: AgregaNoticiaComponent
      },
      {
        path: '**', redirectTo: 'noticias'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
