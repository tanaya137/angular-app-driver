import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) { }

    private getRawApi(): string {
        return 'http://localhost:4201';
    }

    public submitInstrumentValue(data: string): Observable<any> {
        return this.http.get(this.getRawApi() + '/instrument/submit/' + data + '');
    }
} 
