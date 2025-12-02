import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from '../services/cliente/cliente.service';
import { NgForm } from '@angular/forms';
//import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    mensaje = '';

  // Modelo que se va a mandar al backend
  model: Cliente = {
    id_cliente: undefined,
    nombre: '',
    apellido: '',
    correo_electronico: '',
    telefono: '',
    cedula: undefined,
    password: ''
  };
  
  constructor(private clienteService: ClienteService) { }

  onRegister(form: NgForm): void {
    this.mensaje = '';

    if (form.invalid) {
      return;
    }

    this.clienteService.crearCliente(this.model).subscribe({
      next: (resp) => {
        this.mensaje = resp.mensaje || 'Cliente registrado correctamente';
        form.resetForm(); // limpiar formulario
      },
      error: (err) => {
        this.mensaje = err.error?.mensaje || 'Error al registrar el cliente';
      }
    });
  }

}
