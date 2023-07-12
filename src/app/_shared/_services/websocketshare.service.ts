import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class WebSocketShareService implements OnDestroy {

    private notifactionDataSubject = new BehaviorSubject<string>(undefined);

    constructor() { }
    
    public onNewValueReceive(msg: string) {        
        this.notifactionDataSubject.next(msg);
    }

    public getNewValue(): Observable<string> {
        return this.notifactionDataSubject.asObservable();
    }

    public ngOnDestroy(): void {
        this.notifactionDataSubject.unsubscribe();
    }
}