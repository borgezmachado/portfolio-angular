import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  TecnologiaService,
  Tecnologia
} from '../tecnologia.service';

@Component({
  selector: 'app-catalogo',

  standalone: true,

  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule
  ],

  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  private service = inject(TecnologiaService);

  tecnologias: Tecnologia[] = [];

  tecnologiasFiltradas: Tecnologia[] = [];

  carregando = true;

  erro = '';

  busca = '';

  categoriaSelecionada = '';


  get categorias(): string[] {

    return [
      ...new Set(
        this.tecnologias
          .map(t => t.categoria)
          .filter(Boolean)
      )
    ];

  }


  ngOnInit(): void {

    this.carregarTecnologias();

  }


  carregarTecnologias(): void {

    this.carregando = true;

    this.erro = '';

    this.service.listar().subscribe({

      next: (lista) => {

        // Remove tecnologias duplicadas
        this.tecnologias = this.removerDuplicadas(lista);

        this.tecnologiasFiltradas = [
          ...this.tecnologias
        ];

        this.carregando = false;

      },

      error: () => {

        this.erro =
          'Falha ao carregar o catálogo.';

        this.carregando = false;

      }

    });

  }


  private removerDuplicadas(
    lista: Tecnologia[]
  ): Tecnologia[] {

    const ids = new Set<number>();

    const nomes = new Set<string>();

    return lista.filter((tecnologia) => {

      const idJaExiste =
        ids.has(tecnologia.id);

      const nomeNormalizado =
        tecnologia.nome
          .trim()
          .toLowerCase();

      const nomeJaExiste =
        nomes.has(nomeNormalizado);

      if (idJaExiste || nomeJaExiste) {
        return false;
      }

      ids.add(tecnologia.id);

      nomes.add(nomeNormalizado);

      return true;

    });

  }


  filtrarTecnologias(): void {

    const texto =
      this.busca
        .trim()
        .toLowerCase();

    this.tecnologiasFiltradas =
      this.tecnologias.filter((tecnologia) => {

        const correspondeBusca =
          !texto ||
          tecnologia.nome
            .toLowerCase()
            .includes(texto) ||
          tecnologia.categoria
            .toLowerCase()
            .includes(texto) ||
          tecnologia.descricao
            .toLowerCase()
            .includes(texto);

        const correspondeCategoria =
          !this.categoriaSelecionada ||
          tecnologia.categoria ===
            this.categoriaSelecionada;

        return (
          correspondeBusca &&
          correspondeCategoria
        );

      });

  }


  limparBusca(): void {

    this.busca = '';

    this.filtrarTecnologias();

  }


  limparFiltros(): void {

    this.busca = '';

    this.categoriaSelecionada = '';

    this.tecnologiasFiltradas = [
      ...this.tecnologias
    ];

  }


  obterIcone(categoria: string): string {

    switch (categoria.toLowerCase()) {

      case 'frontend':
        return 'web';

      case 'backend':
        return 'dns';

      case 'linguagem':
        return 'code';

      case 'banco de dados':
        return 'storage';

      case 'ferramentas':
        return 'build';

      case 'ui / design':
        return 'palette';

      case 'mobile':
        return 'phone_android';

      case 'devops':
        return 'cloud';

      default:
        return 'terminal';

    }

  }

}