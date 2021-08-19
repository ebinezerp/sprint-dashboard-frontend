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

  currentSprint: Subject<Sprint> = new Subject<Sprint>();
  
  constructor(private httpClient: HttpClient) { }


  getCurrentScrum(projectId: string): Observable<Sprint> {
      const currentDate = new Date();
      const date = currentDate.getDate()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getFullYear();
      return this.httpClient.get<Sprint>(SprintService.URL+'/project/'+projectId+'/sprint-date/'+date)
      .pipe(
        tap(sprint =>{
           this.currentSprint.next(sprint);
        })
      )
  }

}
