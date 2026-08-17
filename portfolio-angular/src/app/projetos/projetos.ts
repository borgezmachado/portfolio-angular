// src/app/projetos/projetos.ts

import { Component, inject, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  ProjetoService,
  Projeto
} from '../projeto.service';


@Component({
  selector: 'app-projetos',

  standalone: true,

  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],

  templateUrl: './projetos.html',

  styleUrl: './projetos.css'
})
export class Projetos implements OnInit {

  // =========================================================
  // SERVIÇO
  // =========================================================

  private service = inject(ProjetoService);


  // =========================================================
  // ESTADOS
  // =========================================================

  projetos: Projeto[] = [];

  carregando = true;

  erro = '';


  // =========================================================
  // CARREGAMENTO DOS PROJETOS
  // =========================================================

  ngOnInit(): void {

    this.service.listar().subscribe({

      // -----------------------------------------------
      // SUCESSO
      // -----------------------------------------------

      next: (lista) => {

        this.projetos = lista;

        this.carregando = false;

        this.erro = '';

      },


      // -----------------------------------------------
      // ERRO
      // -----------------------------------------------

      error: (err) => {

        console.error(
          'Erro ao carregar projetos:',
          err
        );

        this.erro =
          'Falha ao carregar os projetos.';

        this.carregando = false;

      }

    });

  }

}