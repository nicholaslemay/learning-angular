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
    provider = new PactWeb({port: 1234, pactfileWriteMode: "overwrite"});
    // required for slower Travis CI environment
    // setTimeout(function() {
    //   // Required if run with `singleRun: false`
    //   done();
    // }, 500);

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

  beforeEach(async ()=>{
    await provider.removeInteractions();
  })

  describe('creating a valid user',  () =>{
    let userReturnedFromService = {id: 33} as User;
    const newUserToCreate = new NewUser('tony', 'tonye@gmail.com', 'male');

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
  });

  describe('creating an invalid user',  () =>{
    beforeEach( async ()=>{
      await provider.addInteraction({
        state: `request is missing fields`,
        uponReceiving: 'an invalid POST request to create a user',
        withRequest: {
          method: 'POST',
          path: '/public/v2/users',
          body: {
          },
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 400
        }
      })
    });

    it('returns the created user',  (done) => {
      userService.createUser({} as NewUser).subscribe({
        next: (u)=>{
          fail('Expected an error');
          done();
        },
        error: (e)=>{
          expect(e.status).toBe(400);
          done();
        }
      })
    });
  })
});








