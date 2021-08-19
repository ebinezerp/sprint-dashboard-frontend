import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  static URL: string = 'http://localhost:8084/api/project';

  constructor(private httpClient: HttpClient) { 
  }

  getProject(projectId: string): Observable<Project> {
    return this.httpClient.get<Project>(ProjectService.URL+'/'+projectId);
  }
  
}
