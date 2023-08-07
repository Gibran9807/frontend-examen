import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './agrega-noticia.component.html',
  styleUrls: ['./agrega-noticia.component.css']
})
export class AgregaNoticiaComponent {

  private fb = inject(FormBuilder);
  private noticiaService = inject(NoticiaService);
  private router = inject(Router);

  public myFormNoticia: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    contenido: ['', [Validators.required]],
  });


  addNoticia(){

    const id = localStorage.getItem('user');
    const autor = Number(id)

    const titulo = this.myFormNoticia.get('titulo')?.value;
    const contenido = this.myFormNoticia.get('contenido')?.value;

    console.log(titulo, contenido, autor);


    this.noticiaService.postNoticia(titulo, contenido, autor)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/auth/noticias']);
        },
        (err) => console.log(err)

      )

  }


}
