import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CriarContaService } from '../criar-conta.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrl: './criar-conta.component.css'
})
export class CriarContaComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private criarContaService: CriarContaService
  ) {}

  ngOnInit() {
    this.cadastroForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
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
      this.router.navigate(['/login']);
      this.criarContaService.signup(this.cadastroForm.value.email, this.cadastroForm.value.senha)
      window.alert('Cadastro realizado com sucesso!')
      // Implementar lógica de envio dos dados

    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.cadastroForm.get(controlName)?.hasError(errorName) || false;
  }
}
