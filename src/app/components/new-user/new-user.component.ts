import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UsersService } from "src/app/services/users.service";
import { DevicesService } from "src/app/services/devices.service";
import { Device } from "src/app/models/device";
@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"]
})
export class NewUserComponent implements OnInit {
  firstname: string;
  lastname: string;
  loading: boolean = false;
  devices: Device[];
  selectedDevice: string;
  error: string;
  constructor(
    private userService: UsersService,
    private deviceService: DevicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.deviceService.fetchDevices();
    this.deviceService.onFetchDevices.subscribe(response => {
      this.devices = response;
    });
  }
  async saveUser() {
    this.loading = true;
    let user: User = {
      firstname: this.firstname,
      lastname: this.lastname,
      device: this.selectedDevice
    };
    try {
      await this.userService.createUser(user);
      this.loading = false;
      this.router.navigateByUrl("/users");
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.error = error;
    }
  }
}
