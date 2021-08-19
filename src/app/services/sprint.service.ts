import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Sprint } from '../model/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  static URL = 'http://localhost:8084/api/sprint';
  
  sprint?: Sprint
  sprintSelected: Subject<Sprint> = new Subject<Sprint>();

  constructor(private httpClient: HttpClient) { }


  getSprint(projectId: string, date: string): Observable<Sprint>{
    const sprintDate = new Date(date);
    const dateFormat = sprintDate.getDate()+"-"+(sprintDate.getMonth()+1)+"-"+sprintDate.getFullYear();
    return this.httpClient.get<Sprint>(SprintService.URL+'/search/project/'+projectId+'/sprint-date/'+ dateFormat)
            .pipe(
              tap(sprint => {
                 this.sprint = sprint;
              })
            )
  }

  selectSprint() {

  }

}
