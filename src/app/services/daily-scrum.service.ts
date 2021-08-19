import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyScrum } from '../model/daily-scrum';

@Injectable({
  providedIn: 'root'
})
export class DailyScrumService {

  static URL = 'http://localhost:8084/api/daily-scrum'

  constructor(private httpClient: HttpClient) { }

  getSprintScrums(sprintId: { projectId: string, sprintNo: number}|undefined): Observable<DailyScrum[]> {
    return this.httpClient.get<DailyScrum[]>(DailyScrumService.URL+'/project/'+sprintId?.projectId+'/sprint/'+sprintId?.sprintNo);
  }

}
