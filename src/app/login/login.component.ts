import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente/cliente.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private clienteService: ClienteService) { }

  showPass = false;
  model = {
    correo_electronico: '',
    password: '',
    remember: true,
    };

  mensaje= '';


onLogin(): void {
    this.mensaje = '';

   const { correo_electronico, password } = this.model;
    this.clienteService.login(correo_electronico, password)
      .subscribe({
        next: (resp) => {
          this.mensaje = resp.mensaje || 'Login correcto';

          // guardo el cliente en localStorage (sin password)
          if (resp.cliente) {
            localStorage.setItem('cliente', JSON.stringify(resp.cliente));
          }
        },
        error: (err) => {
          this.mensaje = err.error?.mensaje || 'Error en el login';
        }
      });
  }
}
