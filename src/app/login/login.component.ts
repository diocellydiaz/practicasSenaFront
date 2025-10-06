import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPass = false;
  model = {
    email: '',
    password: '',
    remember: true
  };

  onSubmit(f: NgForm) {
    if (f.invalid) return;
    // Aquí llamas a tu AuthService
    // this.auth.login(this.model).subscribe(...)
    console.log('LOGIN', this.model);
  }
}
