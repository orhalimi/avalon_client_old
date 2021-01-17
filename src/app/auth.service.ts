import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public data: any;
  API_URL = 'http://3.121.195.232:12345'; //3.121.195.232 52.57.227.87
  TOKEN_KEY = 'token';



  NAME = 'name';
  EXPIRE = 'expiry';

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
    const itemStr = localStorage.getItem(this.EXPIRE)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return false;
    }
    const expiry = Number(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(this.NAME);
      localStorage.removeItem(this.EXPIRE);
      localStorage.removeItem(this.TOKEN_KEY);
      return false;
    }
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.NAME);
    localStorage.removeItem(this.EXPIRE);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  login(username: string, pass: string, p: () => void) {

    this.http.post(this.API_URL + '/login', '{"username": "' + username + '", "password": "' + pass + '"}').subscribe(
      (res: any) => {
        const now = new Date()
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.EXPIRE, String(now.getTime() + 10000000000));
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

    this.http.post(this.API_URL + '/register2', data, headers).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/');
      }
    );
  }

  getAccount() {
    return this.http.get(this.API_URL + '/account');
  }
}
