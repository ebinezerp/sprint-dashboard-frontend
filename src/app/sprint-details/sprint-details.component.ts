import { Component, OnInit } from '@angular/core';
import { ProjectRole } from '../model/project-role';
import { User } from '../model/user';
import { ProjectService } from '../services/project.service';
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

  constructor(
    private projectService: ProjectService,
    private userService: UserService) { 
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
            }
          )
        }
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

}
