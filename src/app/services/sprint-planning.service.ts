import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint } from '../model/sprint';
import { SprintPlanning } from '../model/sprint-planning';
import { SprintService } from './sprint.service';

@Injectable({
  providedIn: 'root'
})
export class SprintPlanningService {

  static URL = 'http://localhost:8084/api/sprint-planning';

  sprint?:Sprint;
  

  constructor(
    private httpClient: HttpClient,
    private sprintService: SprintService) { 
      this.sprintService.currentSprint.subscribe(
        (sprint)=>{
          this.sprint = sprint;
        }
      )
  }

  save(sprintPlanning: SprintPlanning): Observable<boolean>{
      sprintPlanning.sprintId = this.sprint?.sprintId;
      return this.httpClient.post<boolean>(SprintPlanningService.URL,sprintPlanning,{
        headers:{
          'Content-Type':'application/json'
        }
      })
  }
}
