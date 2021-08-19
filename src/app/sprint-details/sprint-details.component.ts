import { Component, OnInit } from '@angular/core';
import { ProjectRole } from '../model/project-role';
import { Sprint } from '../model/sprint';
import { User } from '../model/user';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  userList: User[];
  scrumMasterCount = 0;
  developmentMembers = 0;
  pairCount=0;
  sprint?:Sprint;


  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private sprintService: SprintService) { 
    this.userList = [];
  }

  ngOnInit(): void {
    /**
     * considering project -1 by default
     */
     this.userService.getProjectUsers('1').subscribe(
      (users) => {
        this.userList = users;
        this.scrumMasterCount = this.userService.getScrumMasterCount();
        this.developmentMembers = this.userService.getDevelopmentMembersCount();
        this.pairCount = this.userService.getPairCount();
      }
    )

     this.sprintService.getCurrentScrum('1').subscribe(
       (sprint: Sprint) => {
         this.sprint = sprint;
       }
     )

  }


}
