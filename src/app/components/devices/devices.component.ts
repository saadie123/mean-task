import { Component, OnInit, OnDestroy } from "@angular/core";
import { DevicesService } from "src/app/services/devices.service";
import { Subscription } from "rxjs";
import { Device } from "src/app/models/device";
import { MatDialog } from "@angular/material";
import { CustomDialogComponent } from "../ui/dialog/dialog.component";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"]
})
export class DevicesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  devices: Device[];
  editableItems = new Set<Device>();
  constructor(
    private deviceService: DevicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.deviceService.fetchDevices();
    this.subscription = this.deviceService.onFetchDevices.subscribe(devices => {
      this.devices = devices;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleEditable(item: Device) {
    if (this.editableItems.has(item)) {
      this.editableItems.delete(item);
    } else {
      this.editableItems.add(item);
    }
  }
  onPressDelete(id) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(id => {
      this.deviceService.deleteDevice(id);
      console.log(id);
    });
  }
  onUpdate(id, device: Device) {
    this.toggleEditable(device);
    this.deviceService.updateDevice(id, device);
  }
}
