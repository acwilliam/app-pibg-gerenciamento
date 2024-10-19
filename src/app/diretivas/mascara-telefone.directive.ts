import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMascaraTelefone]'
})
export class MascaraTelefoneDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formataTelefone(initialValue);
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  formataTelefone(value: string): string {
    if (!value) return value;
    const numeroApenas = value.replace(/\D/g, '');
    let telefoneFormatado = '';

    if (numeroApenas.length <= 10) {
      telefoneFormatado = numeroApenas.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      telefoneFormatado = numeroApenas.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return telefoneFormatado.slice(0, 15);
  }

}
