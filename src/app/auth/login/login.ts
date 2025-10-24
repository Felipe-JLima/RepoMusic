import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private authService: Auth, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
      return; // Impede a submissão se o formulário for inválido
    }

    const success = this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    if (success) {
      this.router.navigate(['/home']);
    } else {
      alert('E-mail ou senha inválidos!');
    }
  }
}
