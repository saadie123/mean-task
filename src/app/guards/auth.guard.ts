import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.token) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
