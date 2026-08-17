// src/app/contato/contato.ts

import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  ContatoService,
  NovoContato
} from '../contato.service';


@Component({
  selector: 'app-contato',

  standalone: true,

  imports: [
    ReactiveFormsModule,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],

  templateUrl: './contato.html',

  styleUrl: './contato.css',
})


export class Contato {

  private fb = inject(FormBuilder);

  private service = inject(ContatoService);


  // Estados da tela
  enviando = false;

  sucesso = '';

  erro = '';


  // =========================================================
  // FORMULÁRIO
  // =========================================================

  form = this.fb.group({

    nome: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    mensagem: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

  });


  // =========================================================
  // ENVIO DO FORMULÁRIO
  // =========================================================

  onSubmit(): void {

    // Limpa mensagens anteriores
    this.sucesso = '';

    this.erro = '';


    // Impede envio se o formulário estiver inválido
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    // Ativa estado de carregamento
    this.enviando = true;


    // Pega os dados do formulário
    const dados = this.form.getRawValue() as NovoContato;


    // Envia para a API PHP
    this.service.enviar(dados).subscribe({

      // =====================================================
      // SUCESSO
      // =====================================================

      next: (resp) => {

        this.sucesso = resp.mensagem;

        // Limpa os campos
        this.form.reset();

        // Finaliza carregamento
        this.enviando = false;

      },


      // =====================================================
      // ERRO
      // =====================================================

      error: () => {

        this.erro =
          'Não foi possível enviar. Tente novamente.';

        this.enviando = false;

      },

    });

  }


  // =========================================================
  // LIMPAR FORMULÁRIO
  // =========================================================

  limpar(): void {

    // Limpa os campos
    this.form.reset();

    // Limpa mensagens
    this.sucesso = '';

    this.erro = '';

    // Garante que o botão volte ao estado normal
    this.enviando = false;

  }

}