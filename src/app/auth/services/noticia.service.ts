import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Noticia } from '../interfaces';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  getNoticiaPorId(id: number): Observable<Noticia> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Noticia>(url);
  }

  postComentario(idnoticia: number, comentario: string, idpersonal?: number) {
    const url = `${this.baseUrl}/noticias/comentario`;

    const body = { idnoticia: idnoticia, comentario: comentario, idpersonal: idpersonal, };

    const rawBody = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const request = new HttpRequest('POST', url, rawBody, {headers})
    return this.http.request(request);
  }

  postRespuesta(idcomentario: number, contenido_respuesta: string, idpersonal?: number) {
    const url = `${this.baseUrl}/noticias/respuestas`;

    const body = { idcomentario: idcomentario,idpersonal_respuesta: idpersonal,contenido_respuesta: contenido_respuesta};

    const rawBody = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const request = new HttpRequest('POST', url, rawBody, {headers})
    return this.http.request(request);
  }


  postNoticia(titulo: string, contenido: string, idpersonal: number) {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}/noticias`;

    const body = { titulo: titulo, contenido: contenido, autor: idpersonal };

    const rawBody = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
      Accept: 'application/json',
    })

    const request = new HttpRequest('POST', url, rawBody, {headers})
    return this.http.request(request);
  }
}
