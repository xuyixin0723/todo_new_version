import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotifyService {
    private subject = new Subject<any>();

    send(isNotify: boolean) {
        this.subject.next(isNotify);
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }
}
