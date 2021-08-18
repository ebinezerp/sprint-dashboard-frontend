import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  projectName?: string;

  constructor(private projectService: ProjectService) {
    this.projectName='';
  }

  ngOnInit(): void {
    this.projectService.selectedProject.subscribe(
      (project) => {
        this.projectName = project.projectName;
      }
    )
  }

}
