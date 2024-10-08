import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CriarContaService } from '../criar-conta.service';
import { PessoaService } from '../pessoa.service';
import { catchError, debounceTime, first, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pessoa } from '../Pessoa';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrl: './criar-conta.component.css'
})
export class CriarContaComponent implements OnInit {
  cadastroForm!: FormGroup;
  pessoa: Pessoa = {
    nome: '',
    email: '',
    sobrenome: '',
    role: 'M'
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private criarContaService: CriarContaService,
    private pessoaService: PessoaService
  ) {}

  ngOnInit() {
    this.cadastroForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], this.pessoaExist()],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const senha = group.get('senha');
    const confirmarSenha = group.get('confirmarSenha');

    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmarSenha?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
      if (this.cadastroForm.valid) {
        console.log(this.cadastroForm.value);
        this.pessoaService.cadastrarPessoa(this.parsePessoa(this.cadastroForm.value))
        this.criarContaService.signup(this.cadastroForm.value.email, this.cadastroForm.value.senha)
        this.router.navigate(['/login']);
        }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.cadastroForm.get(controlName)?.hasError(errorName) || false;
  }

  pessoaExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((email: string) =>
          this.pessoaService.buscarCadastroByEmail(email).pipe(
            map(response => {
              return response ? { pessoaExists: true } : null;
            }),
            catchError(() => of(null))
          )
        ),
        first()
      );
    };
  }

  private parsePessoa(value: any): Pessoa {
    this.pessoa.email = value.email;
    this.pessoa.nome = value.nome;
    this.pessoa.sobrenome = value.sobrenome

    return this.pessoa
  }
}
