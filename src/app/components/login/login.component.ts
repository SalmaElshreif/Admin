import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/home']); 
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}