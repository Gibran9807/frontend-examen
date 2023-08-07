import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css'],
})

export class LoginPagesComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    nombre_usuario: ['', [Validators.required]],
    contrasena: ['',[ Validators.required, Validators.minLength(6)]],
  });

  constructor(
  ) {}

  login() {
    const username = this.myForm.get('nombre_usuario')?.value;
    const password = this.myForm.get('contrasena')?.value;

    this.authService.login(username, password)
    .subscribe({
      next: () => console.log('bien'),
      error: (err) => {
        Swal.fire('Error', 'Credenciales incorrectas', 'error')
      },
    })
    }

}
