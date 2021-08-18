import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static URL = 'http://localhost:8084/api/user'

  constructor(private httpClient: HttpClient) { }

  getProjectUsers(id: string): Observable<User[]>{
    return this.httpClient.get<User[]>(UserService.URL+'/project/'+id);
  }
}
