import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarioLogado';

  setUsuario(usuario: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }

  getUsuario(): any {
    const usuario = localStorage.getItem(this.STORAGE_KEY);
    return usuario ? JSON.parse(usuario) : null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  estaLogado(): boolean {
    return !!this.getUsuario();
  }
}
