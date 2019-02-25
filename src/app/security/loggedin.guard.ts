import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string): boolean {
        let loggedIn = this.loginService.isLoggedIn();
        // se nao estiver logado sera redirecionado para a pagina de login
        if (!loggedIn) {
            console.log(`route.path: ${path}`);
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;
    }

    // sempre é o primeiro a executar
    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }

    // segundo a executar
    // ActivatedRouteSnapshot: copia da rota ativa
    // RouterStateSnapshot: tem o caminho de todas as rotas ativadas até a rota atual
    // routeConfig é o mesmo do route do canLoad
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthentication(route.routeConfig.path);
    }

}
