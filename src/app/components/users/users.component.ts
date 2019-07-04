import { OnInit, Component, OnDestroy } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { CustomDialogComponent } from "../ui/dialog/dialog.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  displayedColumns: string[] = ["firstname", "lastname", "status", "delete"];
  constructor(private userService: UsersService, private dialog: MatDialog) {}
  ngOnInit() {
    this.userService.fetchUsers();
    this.subscription = this.userService.onFetchUsers.subscribe(users => {
      this.users = users.map(user => {
        return {
          ...user,
          available: user.device ? false : true
        };
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onOptionChange(event, user) {
    if (event.target.value === "available") {
      this.userService.updateUserStatus(user);
    }
  }
  onPressDelete(id) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(id => {
      this.userService.deleteUser(id);
    });
  }
}
