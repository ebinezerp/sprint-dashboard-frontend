import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DailyScrum } from '../model/daily-scrum';
import { SprintScrumSummary } from '../model/sprint-scrum-summary';
import { User } from '../model/user';
import { DailyScrumService } from '../services/daily-scrum.service';
import { SprintScrumSummaryService } from '../services/sprint-scrum-summary.service';
import { SprintService } from '../services/sprint.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-daily-scrum',
  templateUrl: './daily-scrum.component.html',
  styleUrls: ['./daily-scrum.component.css']
})
export class DailyScrumComponent implements OnInit {

  scrum: DailyScrum;
  usersList: User[] = [];
  devTotalCount=0;
  aspmTotalCount=0;
  asmTotalCount=0;
  sprintScrumSummary: SprintScrumSummary;
  actualSprintScrumSummary: SprintScrumSummary;
  
  constructor(
    private userService: UserService,
    private sprintScrumSummaryService: SprintScrumSummaryService,
    private router: Router
    ) {
      const scrumStr = sessionStorage.getItem('scrum');
      if(scrumStr != null){
        this.scrum = JSON.parse(scrumStr);
      }else{
        this.scrum = new DailyScrum();
      }
      this.router.events.subscribe(
        (event: Event) => {
            if(event instanceof NavigationStart){
              if(this.scrum!= undefined){
                sessionStorage.setItem('scrum', JSON.stringify(this.scrum));
              }
            }
        }
      )
      this.sprintScrumSummary = new SprintScrumSummary();
      this.actualSprintScrumSummary = this.sprintScrumSummary.clone();
  }

  ngOnInit(): void {
    this.userService.getUserList.subscribe(
      (users) => {
        this.usersList = users;
        this.devTotalCount = this.userService.getDevelopmentMembersCount();
        this.aspmTotalCount = this.userService.getAspmTotalCount();
        this.asmTotalCount = this.userService.getAsmTotalCount();
      } 
    );

    this.sprintScrumSummary = this.sprintScrumSummaryService.getSprintScrumSummary();

  }

  devCounter(){
    return new Array(this.devTotalCount);
  }

  aspmCounter() {
    return new Array(this.aspmTotalCount);
  }

  asmCounter() {
    return new Array(this.asmTotalCount);
  }

  calDevPercent(){
    let devCount = this.scrum.devCount;
    if( devCount != undefined){
      this.scrum.devPercent = (devCount *100)/this.devTotalCount;
      this.sprintScrumSummary.sprintDevCount = this.sprintScrumSummary.sprintDevCount + devCount;
      this.sprintScrumSummary.sprintDevPercent = (this.sprintScrumSummary.)
    }else{
      this.scrum.devPercent = 0;
    }
  }


  calAspmPercent(){
    let aspmCount = this.scrum.aspmCount;
    if(aspmCount != undefined){
      this.scrum.aspmPercent = (aspmCount*100)/this.aspmTotalCount;
    }else{
      this.scrum.aspmPercent = 0;
    }
  }

  calAsmPercent() {
    let asmCount = this.scrum.asmCount;
    if(asmCount != undefined){
      this.scrum.asmPercent = (asmCount*100)/this.asmTotalCount;
    }else{
      this.scrum.asmPercent = 0;
    }
  }


  submit(scrumForm: NgForm){

  }

}
