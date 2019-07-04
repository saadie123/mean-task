import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "dialog-content",
  templateUrl: "dialog.component.html"
})
export class CustomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
