import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { ValidarPerfilUsuarioService } from '../componentes/validar-perfil-usuario.service';

@Directive({
  selector: '[appHashole]'
})
export class HasholeDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private validarPerfilService: ValidarPerfilUsuarioService
  ) {}

  @Input() appHasRole: string | undefined;

  ngOnInit() {
     // Lógica para verificar o papel do usuário e renderizar o template
  }
}
