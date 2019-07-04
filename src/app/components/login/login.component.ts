import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getPassword();
  }
  async onLogin() {
    this.loading = true;
    this.error = null;
    try {
      if (
        this.username !== "admin" ||
        this.password !== this.authService.serverPassword
      ) {
        throw new Error("Invalid username or password");
      }
      let response: any = await this.authService.loginUser(
        this.username,
        this.password
      );
      this.authService.setToken(response.token);
      this.loading = false;
    } catch (err) {
      if (err.error) {
        this.error = err.error;
      } else {
        this.error = err;
      }
      this.loading = false;
    }
  }
}
