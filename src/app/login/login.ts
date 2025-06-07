import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username!: string;
  password!: string;
  errorMessage: string | null = null;

  private users = [
    { username: 'usuario1', password: 'password1' },
    { username: 'admin', password: 'admin123' },
    { username: 'juan', password: 'juan123' },
  ];

  constructor(private router: Router) {}

  limpiarCampos(): void {
    this.username = '';
    this.password = '';
    this.errorMessage = null;
  }

  login(): void {
    this.errorMessage = null;

    const foundUser = this.users.find(
      (user) =>
        user.username === this.username && user.password === this.password
    );
    if (foundUser) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/bienvenido']);
    } else {
      this.errorMessage =
        'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      console.log('Inicio de sesión fallido');
    }
  }
}
