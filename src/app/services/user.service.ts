import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectRole } from '../model/project-role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static URL = 'http://localhost:8084/api/user'

  getUserList: Subject<User[]> = new Subject<User[]>();
  private usersList: User[] = [];

  constructor(private httpClient: HttpClient) { }

  getProjectUsers(id: string): Observable<User[]>{
    return this.httpClient.get<User[]>(UserService.URL+'/project/'+id)
    .pipe(
      tap(users => {
        this.usersList = users;
        this.getUserList.next(this.usersList);
      })
    )
  }



  getScrumMasterCount(): number {
    return this.usersList
   .filter(user => user.projectRole == ProjectRole.SCRUM_MASTER)
   .length;
 }

 getDevelopmentMembersCount(): number {
   return this.usersList.filter(user => user.projectRole == ProjectRole.DEVELOPER).length;
 }

 getPairCount(): number {
   return this.getDevelopmentMembersCount()/2;
 }

 getAspmTotalCount(): number {
   return this.usersList.filter(user => user.projectRole == ProjectRole.AGILE_SCRUM_PROJECT_MANAGER).length;
 }

 getAsmTotalCount(): number{
  return this.usersList.filter(user => user.projectRole == ProjectRole.ASST_SCRUM_MASTER).length;
 }

}
