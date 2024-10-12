import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        console.log('passou no canActive')
        if (this.authService.isLogado() || this.authService.isResponsible(route.params['email'])) {
          return true;
        }
      }

      // Redireciona para a página de login se não estiver autenticado
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
}
