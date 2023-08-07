export interface NoticiaID {
  idnoticia:    number;
  titulo:       string;
  contenido:    string;
  idpersonal:   number;
  fecha_public: Date;
  comentarios:  Comentario[];
}

export interface Comentario {
  idcomentario: number;
  idnoticia:    number;
  idpersonal:   number | null;
  comentario:   string;
  fecha_hora:   Date;
  respuestas:   Respuesta[];
}

export interface Respuesta {
  idrespuesta:          number;
  idcomentario:         number;
  idpersonal_respuesta: number;
  contenido_respuesta:  string;
  fecha_hora_respuesta: Date;
}
