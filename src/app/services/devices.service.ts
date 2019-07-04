import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Device } from "../models/device";

@Injectable({
  providedIn: "root"
})
export class DevicesService {
  devices: Device[];
  onFetchDevices: EventEmitter<Device[]> = new EventEmitter<Device[]>();
  constructor(private http: HttpClient) {}
  createDevice(device: Device, imageFile) {
    let fd: FormData = new FormData();
    fd.append("name", device.name);
    fd.append("cost", device.cost);
    fd.append("warranty", device.warranty);
    fd.append("expiry", device.expiry);
    fd.append("image", imageFile);
    return this.http.post("/api/devices", fd).toPromise();
  }

  async fetchDevices() {
    let response: any = await this.http.get("/api/devices").toPromise();
    this.onFetchDevices.next(response);
  }
  deleteDevice(id) {
    this.http.delete("/api/devices/" + id).subscribe(
      async response => {
        await this.fetchDevices();
      },
      error => console.log(error)
    );
  }

  async updateDevice(id, device: Device) {
    await this.http.put("/api/devices/" + id, device).toPromise();
  }
}
