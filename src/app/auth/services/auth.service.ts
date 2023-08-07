import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl

  private http = inject(HttpClient)
  private router = inject(Router);


  private _currentUser = signal<User|null>(null)

  public currentUser = computed( () => this._currentUser() )

  constructor() { }

  login( nombre_usuario: string, contrasena: string) {

    const url = `${this.baseUrl}/signin`;
    const body = { nombre_usuario: nombre_usuario, contrasena: contrasena };

    const  rawBody = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    const request = new HttpRequest('POST', url, rawBody, { headers });

    return this.http.request<LoginResponse>(request)
    .pipe(
      map(event => {
      if (event instanceof HttpResponse) {
        const response = event.body as LoginResponse;
        this._currentUser.set(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.idpersonal.toString())

        this.router.navigate(['/noticias']);

        return response;
      }
      return event;
    }),
    catchError( err => {
      console.log(err);
      return throwError( () => 'Algo salio mal');
    })
    );
  }

  register(apepaterno: string, apematerno: string, nombre: string, direccion: string, usuario: string, contrasena: string) {
    const url = `${this.baseUrl}/signup`;
    const body = { apepaterno: apepaterno, apematerno: apematerno, nombre: nombre, direccion: direccion, usuario: usuario, contrasena: contrasena};

    const rawBody = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    const request = new HttpRequest('POST', url, rawBody, { headers });

    return this.http.request<LoginResponse>(request)
    .pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const response = event.body as LoginResponse;
          this._currentUser.set(response.user);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user.idpersonal.toString())

          this.router.navigate(['/noticias']);

          return response;
        }
        return event;
      }),
      catchError( err => {
        console.log(err);
        return throwError( () => 'Algo salio mal')
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/noticias']);
  }

}
