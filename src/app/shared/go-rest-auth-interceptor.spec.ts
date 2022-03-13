import {of} from "rxjs";
import {GoRestAuthInterceptor} from "./go-rest-auth-interceptor";
import {HttpRequest} from "@angular/common/http";
import {GoRestConfig} from "./goRestConfig";

describe('GoRestInterceptor', () => {

  let lastReceivedHttpRequest : HttpRequest<any>;
  const next: any = {
    handle: (eq: HttpRequest<any>) => {
      lastReceivedHttpRequest = eq;
      return of(eq)}
    };

  it('does not add headers to request to other services', () => {
    const interceptor = new GoRestAuthInterceptor();
    interceptor.intercept(new HttpRequest('GET', 'http://someotherRandom.url'), next).subscribe();

    expect(lastReceivedHttpRequest.headers?.get('Authorization')).toBe(null);
    expect(lastReceivedHttpRequest.headers?.get('Content-Type')).toBe(null);
  });

  it('adds appropriate headers to requests to gorest', () => {
    const interceptor = new GoRestAuthInterceptor();
    interceptor.intercept(new HttpRequest('GET', 'http://gorest.co.in/banana'),next).subscribe();
    expect(lastReceivedHttpRequest.headers?.get('Authorization')).toBe(`Bearer ${GoRestConfig.API_TOKEN}`);
    expect(lastReceivedHttpRequest.headers?.get('Content-Type')).toBe('application/json');
  });

});
