import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sidebarVisible: boolean = false;
  showToolbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    const currentRoute = this.router.url;
    this.showToolbar = currentRoute !== '/login';
  }

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  hideSidebar() {
    this.sidebarVisible = false;
  }
}