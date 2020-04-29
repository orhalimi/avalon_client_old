import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public data: any;
  API_URL = 'http://localhost:12345'; //localhost
  TOKEN_KEY = 'token';
  NAME = 'name';

  constructor(private http: HttpClient, private router: Router) {
    this.data = [];
  }




  get name() {
    return localStorage.getItem(this.NAME);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.NAME);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  login(username: string, pass: string, p: () => void) {

    this.http.post(this.API_URL + '/login', '{"username": "' + username + '", "password": "' + pass + '"}').subscribe(
      (res: any) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.NAME, res.name);
        location.reload();

      }
    );
  }


  register(username: string, pass: string) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };

    const data = {
      username,
      password: pass
    };

    this.http.post(this.API_URL + '/register', data, headers).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/');
      }
    );
  }

  getAccount() {
    return this.http.get(this.API_URL + '/account');
  }
}
