import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Noticia } from '../../interfaces';


@Component({
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {

  noticias: Noticia[] = [];

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<Noticia[]>('http://localhost:3000/noticias')
      .subscribe(data => {
        this.noticias = data;

      },
      (err) => console.log(err)
    )

  }

}
