import { Component, OnInit, inject } from '@angular/core';
import { Comentario, Noticia, NoticiaID, Respuesta } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  templateUrl: './noticia-id.component.html',
  styleUrls: ['./noticia-id.component.css'],
})
export class NoticiaIdComponent implements OnInit {
  noticia: Noticia | null = null;
  private fb = inject(FormBuilder);
  private noticiaService = inject(NoticiaService);

  constructor(private route: ActivatedRoute) {}

  titulo: string = '';
  contenido: string = '';
  fecha: Date = new Date();
  comentarios: Comentario[] = [];
  comentario: string = '';
  respuestas: Respuesta[] = [];
  idComent: number = 0;

  public myFormComent: FormGroup = this.fb.group({
    comentario: ['', [Validators.required]],
  });

  public myFormRes: FormGroup = this.fb.group({
    respuesta: ['', [Validators.required]],
  });


  private http = inject(HttpClient);
  private router = inject(Router);



  ngOnInit() {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.http
        .get<NoticiaID>(`http://localhost:3000/noticias/${itemId}`)
        .subscribe(
          (data) => {
            this.titulo = data.titulo;
            this.contenido = data.contenido;
            this.fecha = data.fecha_public;
            this.comentarios = data.comentarios;

            this.respuestas = data.comentarios[0].respuestas;

          },
          (err) => console.log(err)
        );
    });
  }

  addComentario() {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      const id = itemId;
      const comentario = this.myFormComent.get('comentario')?.value;

      const idp = localStorage.getItem('user');
      const idpersonal = Number(idp)


      this.noticiaService.postComentario(id, comentario, idpersonal).subscribe(
        (response) => {
          this.router.navigate(['/auth/noticias']);
        },
        (err) => console.log(err)
      );
    });
  }

  addRespuesta(idcomentario: number) {
    this.route.params.subscribe((params) => {

      const respuesta = this.myFormRes.get('respuesta')?.value;

      const id = localStorage.getItem('user');

      const idpersonal = Number(id)

      console.log(idcomentario, respuesta, idpersonal);

      this.noticiaService.postRespuesta(idcomentario, respuesta, idpersonal).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/auth/noticias']);
        },
        (err) => console.log(err)
      );
    });
  }


}
