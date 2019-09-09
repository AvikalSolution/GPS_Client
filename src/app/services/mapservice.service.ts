import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapserviceService {
  url = 'http://localhost:3000/api/location';
  apiKey = ''; // <-- Enter your own key here!
  constructor(private http: HttpClient) { }

  getLocation(id): Observable<any> {
    return this.http.get(`${this.url}/${id}`)
    //.pipe(
    //  map(results => results['data'])
    //);
  }
}
