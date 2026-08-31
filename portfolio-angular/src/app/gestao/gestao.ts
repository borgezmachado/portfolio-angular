import { Component, inject, OnInit, HostListener } from '@angular/core'; // <--- HostListener ADICIONADO
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-gestao',
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {

  private service = inject(ProjetoService);
  private router = inject(Router);

  projetos: Projeto[] = [];

  carregando = true;
  salvando = false;

  erro = '';

  editandoId: number | null = null;

  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' | 'info' | 'aviso' = 'info';


  form = new FormGroup({

    nome: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ),

    descricao: new FormControl(''),

    tecnologias: new FormControl(''),

    link_github: new FormControl(''),

    ano: new FormControl(
      2026,
      [
        Validators.required
      ]
    )

  });

  // --- LIMPA O TOKEN AO ATUALIZAR (F5) OU FECHAR A PÁGINA ---
  @HostListener('window:beforeunload')
  limparSessaoAoSair() {
    sessionStorage.removeItem('token');
  }

  ngOnInit() {
    // --- VERIFICAÇÃO DE LOGIN ADICIONADA ---
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    // ----------------------------------------

    this.carregar();
  }


  carregar() {

    this.carregando = true;
    this.erro = '';

    this.service.listar().subscribe({

      next: (lista) => {

        this.projetos = lista;
        this.carregando = false;

      },

      error: () => {

        this.erro =
          'Nao foi possivel carregar os projetos.';

        this.carregando = false;

        this.mostrarMensagem(
          'Não foi possível carregar os projetos.',
          'erro'
        );

      }

    });

  }


  editar(p: Projeto) {

    this.editandoId = p.id ?? null;

    this.erro = '';

    this.form.patchValue(p);

    this.mostrarMensagem(
      'Projeto carregado para edição.',
      'info'
    );

  }


  cancelarEdicao() {

    this.editandoId = null;

    this.form.reset({

      nome: '',
      descricao: '',
      tecnologias: '',
      link_github: '',
      ano: 2026

    });

    this.erro = '';

    this.mostrarMensagem(
      'Edição cancelada.',
      'info'
    );

  }


  salvar() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.mostrarMensagem(
        'Verifique os campos obrigatórios.',
        'aviso'
      );

      return;
    }

    this.salvando = true;
    this.erro = '';

    const estavaEditando =
      this.editandoId !== null;

    const dados =
      this.form.value as Projeto;


    const requisicao = estavaEditando

      ? this.service.atualizar(
          this.editandoId!,
          dados
        )

      : this.service.criar(dados);


    requisicao.subscribe({

      next: () => {

        this.salvando = false;

        this.editandoId = null;

        this.form.reset({

          nome: '',
          descricao: '',
          tecnologias: '',
          link_github: '',
          ano: 2026

        });

        this.carregar();

        this.mostrarMensagem(

          estavaEditando
            ? 'Projeto atualizado com sucesso!'
            : 'Projeto criado com sucesso!',

          'sucesso'

        );

      },


      error: () => {

        this.salvando = false;

        this.erro =
          'Nao foi possivel salvar. Tente de novo.';

        this.mostrarMensagem(

          estavaEditando
            ? 'Não foi possível atualizar o projeto.'
            : 'Não foi possível criar o projeto.',

          'erro'

        );

      }

    });

  }


  excluir(p: Projeto) {

    if (!p.id) {
      return;
    }


    const confirmou = confirm(

      `Excluir o projeto "${p.nome}"? Esta acao nao pode ser desfeita.`

    );


    if (!confirmou) {

      this.mostrarMensagem(
        'Exclusão cancelada.',
        'info'
      );

      return;
    }


    this.service.excluir(p.id).subscribe({

      next: () => {

        this.projetos =
          this.projetos.filter(
            x => x.id !== p.id
          );


        if (this.editandoId === p.id) {
          this.cancelarEdicao();
        } else {

          this.mostrarMensagem(
            'Projeto excluído com sucesso.',
            'sucesso'
          );

        }

      },


      error: () => {

        this.erro =
          'Nao foi possivel excluir. Tente de novo.';

        this.mostrarMensagem(
          'Não foi possível excluir o projeto.',
          'erro'
        );

      }

    });

  }


  mostrarMensagem(
    mensagem: string,
    tipo: 'sucesso' | 'erro' | 'info' | 'aviso'
  ) {

    this.mensagem = mensagem;
    this.tipoMensagem = tipo;


    setTimeout(() => {

      this.mensagem = '';

    }, 3500);

  }

}