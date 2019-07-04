import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { DevicesComponent } from "./components/devices/devices.component";
import { MaterialModule } from "./material.module";
import { ToolbarComponent } from "./components/ui/toolbar/toolbar.component";
import { AuthService } from "./services/auth.service";
import { NewDeviceComponent } from "./components/new-device/new-device.component";
import { DevicesService } from "./services/devices.service";
import { CustomDialogComponent } from "./components/ui/dialog/dialog.component";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { NewUserComponent } from "./components/new-user/new-user.component";
import { UsersComponent } from "./components/users/users.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  entryComponents: [CustomDialogComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    DevicesComponent,
    ToolbarComponent,
    NewDeviceComponent,
    CustomDialogComponent,
    UsersComponent,
    NewUserComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  providers: [
    AuthService,
    DevicesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
