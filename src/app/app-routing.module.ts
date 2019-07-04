import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DevicesComponent } from "./components/devices/devices.component";
import { NewDeviceComponent } from "./components/new-device/new-device.component";
import { NewUserComponent } from "./components/new-user/new-user.component";
import { UsersComponent } from "./components/users/users.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/devices",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login"
    }
  },
  {
    path: "devices",
    component: DevicesComponent,
    data: {
      title: "Devices"
    },
    canActivate: [AuthGuard]
  },
  {
    path: "devices/new",
    component: NewDeviceComponent,
    data: {
      title: "Devices"
    },
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    data: {
      title: "Users"
    },
    canActivate: [AuthGuard]
  },
  {
    path: "users/new",
    component: NewUserComponent,
    data: {
      title: "Users"
    },
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    component: SettingsComponent,
    data: {
      title: "Settings"
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
