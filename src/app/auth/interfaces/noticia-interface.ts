export interface Noticia {
  idnoticia:    number;
  titulo:       Titulo;
  contenido:    Contenido;
  idpersonal:   number;
  fecha_public: Date;
}

export enum Contenido {
  ContenidoDeLaNoticia = "Contenido de la noticia",
  EjemploDeContenido = "ejemplo de contenido",
}

export enum Titulo {
  Ejemplo = "Ejemplo",
  TítuloDeLaNoticia = "Título de la noticia",
}
