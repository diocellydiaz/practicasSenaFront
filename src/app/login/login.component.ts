import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  backgroundImage !: string;

  constructor(private authService: AuthService, 
    private router: Router,
  private http: HttpClient) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Guarda el token y redirige
        localStorage.setItem('token', response.token);
        this.router.navigate(['/productos']);
      },
      error => {
        console.error('Error de inicio de sesión', error);
      }
    );


    this.http.get('/assets/Beneficios-del-jabon-artesanal.jpg', { responseType: 'text' })
      .subscribe(url => {
        this.backgroundImage = url;
      });
  }
}

