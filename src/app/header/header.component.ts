import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  projectName?: string;


  constructor(
    private sprintService: SprintService
    ) {
    this.projectName='';
  }

  ngOnInit(): void {
    this.sprintService.currentSprint.subscribe(
      (sprint) => {
        this.projectName = sprint.project?.projectName;
      }
    );
  }

}
