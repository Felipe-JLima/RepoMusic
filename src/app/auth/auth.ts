import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private loggedInKey = 'repoMusicUserLoggedIn';
  private loggedIn: boolean;

  constructor() {
    // Verifica o localStorage ao iniciar o serviço para manter o estado após o refresh
    this.loggedIn = localStorage.getItem(this.loggedInKey) === 'true';
  }

  login(email?: string | null, password?: string | null): boolean {
    // Lógica de autenticação simulada, já que não tenho conexão com BD
    if (email === 'felipe@repomusic.com' && password === '123456') {
      console.log('Login bem-sucedido!');
      this.loggedIn = true;
      localStorage.setItem(this.loggedInKey, 'true'); // Salva no localStorage
      return true;
    }
    console.error('Credenciais inválidas!');
    this.loggedIn = false;
    localStorage.removeItem(this.loggedInKey); // Garante que esteja limpo em caso de falha
    return false;
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem(this.loggedInKey); // Remove do localStorage
  }
}
