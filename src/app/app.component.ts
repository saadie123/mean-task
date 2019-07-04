import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = "mean-task";
  sidenavOpened: boolean = true;
  token: string;
  items = [
    {
      route: "/devices",
      text: "Devices",
      icon: "devices_other"
    },
    {
      route: "/users",
      text: "Users",
      icon: "people"
    },
    {
      route: "/settings",
      text: "Settings",
      icon: "settings"
    }
  ];
  ngOnInit() {
    this.authService.onSetToken.subscribe(token => {
      this.token = token;
    });
    this.authService.getToken();
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
