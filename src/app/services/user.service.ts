import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  get(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  post(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/save-user`, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/update-user/${id}`, user);
  }

  findUserById(id:number){
    return this.http.get<User>(`${this.url}/find-user/${id}`);
  }
}
