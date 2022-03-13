import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {GoRestConfig} from "./goRestConfig";

@Injectable()
export class GoRestAuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.toLowerCase().includes('gorest.co.in')) {
            return next.handle(req.clone({
                headers: req.headers
                    .set('Authorization', `Bearer ${GoRestConfig.API_TOKEN}`)
                    .set('Content-Type', 'application/json')
            }));
        }

        return next.handle(req);
    }
}
