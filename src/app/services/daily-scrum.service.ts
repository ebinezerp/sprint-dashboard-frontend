import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DailyScrum } from '../model/daily-scrum';

@Injectable({
  providedIn: 'root'
})
export class DailyScrumService {

  static URL = 'http://localhost:8084/api/daily-scrum';

  sprintScrums: DailyScrum[] = [];
  getDailyScrums: Subject<DailyScrum[]> = new Subject<DailyScrum[]>();

  constructor(private httpClient: HttpClient) { }

  getSprintScrums(sprintId: { projectId: string, sprintNo: number}|undefined): Observable<DailyScrum[]> {
    return this.httpClient.get<DailyScrum[]>(DailyScrumService.URL+'/project/'+sprintId?.projectId+'/sprint/'+sprintId?.sprintNo)
    .pipe(
      tap(dailyScrums => {
          this.sprintScrums = this.sprintScrums;
      })
    )
  }

}
