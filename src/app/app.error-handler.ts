import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService,
                private injector: Injector,
                private ngZone: NgZone) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            let message = errorResponse.error.message;
            // zona monitorada para que nao tenha erro de apresentacao de mensagens
            this.ngZone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        // erro de autenticacao e redirecionar para a tela te login
                        // o injector cria uma instacia a partir do servico informado
                        this.injector.get(LoginService).handleLogin();
                        break;
                        case 403:
                        // acesso a funcionalidade nao autorizado
                        this.ns.notify(message || 'Não autorizado');
                        break;
                        case 404:
                        // solicitação nao encontrada
                        this.ns.notify(message || 'Recurso não encontrado');
                        break;
                }
            });
        }


        super.handleError(errorResponse);
    }
}
