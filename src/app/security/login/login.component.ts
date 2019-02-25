import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
    // recuperar a rota atraves do snapshot com o parametro 'to' se nao tiver rota redirecionara para a raiz
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }
  // subscribe tem 2 callback 1° de sucesso, 2° de erro e o
  // 3° é o finally que executara obrigatoriamente depois de acessar o primeiro ou segundo callback
  login() {
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                            .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.name}`),
                                       response => this.notificationService.notify(response.error.message),
                                       () => {
                                          this.router.navigate([atob(this.navigateTo)]);
                                       });
  }
}
