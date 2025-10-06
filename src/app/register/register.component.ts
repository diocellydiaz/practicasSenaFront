import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({ username: this.username, password: this.password }).subscribe(
      response => {
        // Redirigir después del registro
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error de registro', error);
      }
    );
  }

}
