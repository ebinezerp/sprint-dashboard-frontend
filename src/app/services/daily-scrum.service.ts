import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DailyScrum } from '../model/daily-scrum';
import { Sprint } from '../model/sprint';
import { SprintService } from './sprint.service';

@Injectable({
  providedIn: 'root'
})
export class DailyScrumService {

  static URL = 'http://localhost:8084/api/daily-scrum';

  sprintScrums: DailyScrum[] = [];
  sprint: Sprint;
  getDailyScrums: Subject<DailyScrum[]> = new Subject<DailyScrum[]>();

  constructor(
    private httpClient: HttpClient,
    private sprintService:SprintService) { 

      this.sprint = new Sprint();
      this.sprintService.currentSprint.subscribe(
        (sprint)=>{
          this.sprint = sprint;
        }
      )
  }

  getSprintScrums(sprintId: { projectId: string, sprintNo: number}|undefined): Observable<DailyScrum[]> {
    return this.httpClient.get<DailyScrum[]>(DailyScrumService.URL+'/project/'+sprintId?.projectId+'/sprint/'+sprintId?.sprintNo)
    .pipe(
      tap(dailyScrums => {
          this.sprintScrums = this.sprintScrums;
      })
    )
  }


  save(scrum: DailyScrum):Observable<boolean>{
    const date = new Date();
    const eventDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    scrum.dailyScrumId = {
      sprint: this.sprint,
      eventDate: eventDate
    }
    console.log(scrum);
    return this.httpClient.post<boolean>(DailyScrumService.URL+'/'+this.sprint.sprintId?.projectId+'/'+this.sprint.sprintId?.sprintNo,scrum,{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

}
