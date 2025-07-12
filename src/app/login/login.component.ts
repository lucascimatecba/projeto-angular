import { AuthService } from './../services/auth.service';
import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {nome, senha} = this.loginForm.value;

      this.loginService.login(nome, senha).subscribe({
        next: (usuario) => {
          this.authService.setUsuario(usuario);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.mensagemErro = err.error?.message || 'Erro ao fazer login';
        }
      })
    }
  }
}
