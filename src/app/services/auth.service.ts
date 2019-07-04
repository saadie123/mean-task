import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GeneratePassword } from "../utils/generatePassword";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  public serverPassword: string;
  public token: string;
  onSetToken: EventEmitter<string> = new EventEmitter<string>();
  getPassword() {
    let password = GeneratePassword(8);
    this.serverPassword = password;
    console.log(`password: ${password}`);
  }
  loginUser(username: string, password: string) {
    return this.http
      .post("/api/auth/login", { username, password })
      .toPromise();
  }
  setToken(token) {
    localStorage.setItem("token", token);
    this.token = token;
    this.onSetToken.next(token);
    this.router.navigateByUrl("/devices");
  }
  getToken() {
    let token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.router.navigateByUrl("/devices");
      this.onSetToken.next(token);
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  logoutUser() {
    localStorage.removeItem("token");
    this.token = null;
    this.onSetToken.next(null);
    this.router.navigateByUrl("/login");
  }
}
