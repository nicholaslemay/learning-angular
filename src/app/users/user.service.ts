import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {NewUser} from "./newUser";


@Injectable({providedIn: 'any'})
export class UserService{
  constructor(private http: HttpClient){}

  createUser(newUser: NewUser){
    return this.http.post<User>('https://gorest.co.in/public/v2/users', newUser);
  }
}

