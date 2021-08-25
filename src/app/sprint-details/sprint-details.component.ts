import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Sprint } from '../model/sprint';
import { User } from '../model/user';
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
    private userService: UserService,
    private sprintService: SprintService,
    private router: Router) { 
    this.userList = [];

    this.router.events.subscribe(
      (event: Event) => {
          if(event instanceof NavigationStart){
            if(this.sprint != undefined){
              sessionStorage.setItem('sprint', JSON.stringify(this.sprint));
            }
          }

      }
    )

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

    this.sprintService.currentSprint.subscribe(
      (sprint)=>{
        this.sprint = sprint;
      }
    )

    const sprintStr = sessionStorage.getItem('sprint');
    if(sprintStr != null){
      this.sprint = JSON.parse(sprintStr);
    }

  }


}
