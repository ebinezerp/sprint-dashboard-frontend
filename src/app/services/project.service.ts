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
  private projectList: Project[];
  public selectedProject: Subject<Project> = new Subject<Project>();

  constructor(private httpClient: HttpClient) { 
    this.projectList=[];
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(ProjectService.URL)
    .pipe(
      tap(list=>{
        this.projectList = list;
      })
    );
  }


  selectProject(id: string){
    const selectedPro = this.projectList.find(project => project.projectId==id);
    if(selectedPro!=undefined){
      this.selectedProject.next(selectedPro);
    }
  }

}
