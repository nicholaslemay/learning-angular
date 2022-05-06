import {Injectable, Optional} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {NewUser} from "./newUser";
import {GoRestConfig} from "../shared/goRestConfig";


@Injectable({providedIn: 'any'})
export class UserService{
  constructor(private http: HttpClient, private config: GoRestConfig){
  }

  createUser(newUser: NewUser){
    return this.http.post<User>(`${this.config.BASE_URL}/public/v2/users`, newUser);
  }
}

