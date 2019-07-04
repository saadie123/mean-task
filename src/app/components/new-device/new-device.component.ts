import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DevicesService } from "src/app/services/devices.service";
import { Device } from "src/app/models/device";
import { Router } from "@angular/router";
@Component({
  selector: "app-new-device",
  templateUrl: "./new-device.component.html",
  styleUrls: ["./new-device.component.scss"]
})
export class NewDeviceComponent implements OnInit {
  name: string;
  cost: string;
  warranty: string;
  expiry: FormControl = new FormControl(new Date());
  image: FormControl = new FormControl();
  loading: boolean = false;
  error: string;
  constructor(private deviceService: DevicesService, private router: Router) {}

  ngOnInit() {}
  async saveDevice() {
    this.loading = true;
    let device: Device = {
      name: this.name,
      cost: this.cost,
      warranty: this.warranty,
      expiry: this.expiry.value
    };
    try {
      await this.deviceService.createDevice(device, this.image.value._files[0]);
      this.loading = false;
      this.router.navigateByUrl("/devices");
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  }
}
