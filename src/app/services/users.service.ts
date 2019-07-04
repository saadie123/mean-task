import { Injectable, EventEmitter } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  onFetchUsers: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private http: HttpClient) {}
  createUser(user: User) {
    return this.http.post("/api/users", user).toPromise();
  }
  async fetchUsers() {
    let response: any = await this.http.get("/api/users").toPromise();
    this.onFetchUsers.next(response);
  }
  async updateUserStatus(user) {
    await this.http.put("/api/users/" + user._id, user).toPromise();
  }
  deleteUser(id) {
    this.http.delete("/api/users/" + id).subscribe(
      async response => {
        await this.fetchUsers();
      },
      error => console.log(error)
    );
  }
}
