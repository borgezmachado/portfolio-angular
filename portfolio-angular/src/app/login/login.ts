import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private router = inject(Router);

  carregando = false;
  erro = '';

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });

  fazerLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.erro = '';

    const { usuario, senha } = this.form.value;

    // Substitua pelas suas credenciais válidas ou chamada de API
    if (usuario === 'admin' && senha === '123456') {
      sessionStorage.setItem('token', 'usuario-autenticado');
      this.router.navigate(['/gestao']);
    } else {
      this.carregando = false;
      this.erro = 'Usuário ou senha incorretos.';
    }
  }
}