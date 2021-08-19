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
    this.projectService.selectedProject.subscribe(
      (project) =>{
        if(project.projectId!=undefined){
          this.userService.getProjectUsers(project.projectId).subscribe(
            (users) => {
              this.userList = users;
              this.getScrumMasterCount();
              this.getDevelopmentMembersCount();
              this.getPairCount();
            }
          )
        }
      }
    );

    this.sprintService.sprintSelected.subscribe(
      (sprint: Sprint)=> {
        console.log(sprint);
          this.sprint = sprint;
      }
    )
  }


  getScrumMasterCount(): void {
     this.scrumMasterCount = this.userList
    .filter(user => user.projectRole == ProjectRole.SCRUM_MASTER)
    .length;
  }

  getDevelopmentMembersCount() {
    this.developmentMembers = this.userList.filter(user => user.projectRole == ProjectRole.DEVELOPER).length;
  }

  getPairCount(){
    this.pairCount = this.developmentMembers/2;
  }

}
