import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myFormRegister: FormGroup = this.fb.group({
    apepaterno: ['', [Validators.required]],
    apematerno: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    nombre_usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    const paterno = this.myFormRegister.get('apepaterno')?.value;
    const materno = this.myFormRegister.get('apematerno')?.value;
    const nombre = this.myFormRegister.get('nombre')?.value;
    const direccion = this.myFormRegister.get('direccion')?.value;
    const usuario = this.myFormRegister.get('nombre_usuario')?.value;
    const contrasena = this.myFormRegister.get('contrasena')?.value;

    this.authService
      .register(paterno, materno, nombre, direccion, usuario, contrasena)
      .subscribe({
        next: () => console.log('bien'),
        error: (err) => {
          Swal.fire('Error', 'Credenciales incorrectas', 'error');
        },
      });
  }
}
