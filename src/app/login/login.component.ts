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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, senha} = this.loginForm.value;

      this.loginService.login(email, senha).subscribe({
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
