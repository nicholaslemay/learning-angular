import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./user.service";
import {User} from "./user";
import {NewUser} from "./newUser";
import {GoRestConfig} from "../shared/goRestConfig";
import {Matchers, PactWeb} from "@pact-foundation/pact-web";
import {TestBed} from "@angular/core/testing";

let userService: UserService;

describe('UserService pact', () => {

  let provider : PactWeb;

  beforeAll(async ()=>{
    provider = new PactWeb({port: 1234});
    // required for slower Travis CI environment
    // setTimeout(function() {
    //   // Required if run with `singleRun: false`
    //   done();
    // }, 500);

    await provider.removeInteractions();
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        UserService,
        {provide: GoRestConfig, useValue: {BASE_URL : 'http://127.0.0.1:1234', API_TOKEN: ''} as GoRestConfig}
      ],
    });
    userService = TestBed.inject(UserService);
  });

  afterAll(async () => {
    await provider.finalize()
  })

  describe('creating a valid user',  () =>{
    let userReturnedFromService = {id: 33} as User;
    const newUserToCreate = new NewUser('tony', 'tony@gmail.com', 'male');

    beforeEach( async ()=>{
     await provider.addInteraction({
        state: `request is valid`,
        uponReceiving: 'a POST request to create a user',
        withRequest: {
          method: 'POST',
          path: '/public/v2/users',
          body: Matchers.somethingLike(newUserToCreate),
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike(userReturnedFromService)
        }
      })
    });

    it('returns the created user',  (done) => {
      userService.createUser(newUserToCreate).subscribe({
        next: (u)=>{
          expect(u).toEqual(userReturnedFromService);
          done();
        },
        error: (e)=>{
          fail(e);
          done();
        }
      })
    });
  })
});








