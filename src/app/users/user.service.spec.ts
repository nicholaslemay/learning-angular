import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "./user.service";
import {User} from "./user";
import {of} from "rxjs";
import {NewUser} from "./newUser";
import {GoRestConfig} from "../shared/goRestConfig";

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let userService: UserService;

describe('UserService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    userService = new UserService(httpClientSpy, new GoRestConfig());
  });

  it('should return expected heroes (HttpClient called once)', () => {
    let expectedUser = {id: 33} as User;
    httpClientSpy.post.and.returnValue(of(expectedUser));

    const newUser = new NewUser('tony', 'tony@gmail.com', 'male');
    userService.createUser(newUser).subscribe(u => {
      expect(u).toBe(expectedUser);
    });

    expect(httpClientSpy.post).toHaveBeenCalledOnceWith('https://gorest.co.in/public/v2/users', newUser);
  });
});



