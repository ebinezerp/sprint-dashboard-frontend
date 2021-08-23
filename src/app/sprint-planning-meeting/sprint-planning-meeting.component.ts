import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event, NavigationStart, Router } from '@angular/router';
import { SprintPlanning } from '../model/sprint-planning';
import { User } from '../model/user';
import { SprintPlanningService } from '../services/sprint-planning.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sprint-planning-meeting',
  templateUrl: './sprint-planning-meeting.component.html',
  styleUrls: ['./sprint-planning-meeting.component.css']
})
export class SprintPlanningMeetingComponent implements OnInit {

  usersList: User[];
  sprintPlanning: SprintPlanning;

  devTotalCount=0;
  aspmTotalCount=0;
  asmTotalCount=0;
  devCounter:any[]=[];
  aspmCounter:any[]=[];
  asmCounter:any[]=[];

  constructor(
    private userService:UserService,
    private router:Router,
    private sprintPlanningService: SprintPlanningService) { 
    
    this.sprintPlanning = new SprintPlanning();
    this.usersList=[];

    this.router.events.subscribe(
      (event: Event) => {
          if(event instanceof NavigationStart){
            if(this.sprintPlanning != undefined){
              sessionStorage.setItem('sprintPlanning', JSON.stringify(this.sprintPlanning));
            }
          }

      }
    )


  }

  ngOnInit(): void {
    this.userService.getUserList.subscribe(
      (users) => {
        this.usersList = users;
        this.devTotalCount = this.userService.getDevelopmentMembersCount();
        this.devCounter = new Array(this.devTotalCount);
        this.aspmTotalCount = this.userService.getAspmTotalCount();
        this.aspmCounter = new Array(this.aspmTotalCount);
        this.asmTotalCount = this.userService.getAsmTotalCount();
        this.asmCounter = new Array(this.asmTotalCount);
      } 
    );


    const sprintPlanningStr = sessionStorage.getItem('sprintPlanning');
    if(sprintPlanningStr != null){
      this.sprintPlanning = JSON.parse(sprintPlanningStr);
    }

  }


  calDevPercent(){
    let devCount = this.sprintPlanning.devCount;
    if(devCount != undefined){
      this.sprintPlanning.devPercent = (devCount *100)/this.devTotalCount;
    }else{
      this.sprintPlanning.devPercent = 0;
    }
  }


  calAspmPercent(){
    let aspmCount = this.sprintPlanning.aspmCount;
    if(aspmCount != undefined){
      this.sprintPlanning.aspmPercent = (aspmCount*100)/this.aspmTotalCount;
    }else{
      this.sprintPlanning.aspmPercent = 0;
    }
  }

  calAsmPercent() {
    let asmCount = this.sprintPlanning.asmCount;
    if(asmCount != undefined){
      this.sprintPlanning.asmPercent = (asmCount*100)/this.asmTotalCount;
    }else{
      this.sprintPlanning.asmPercent = 0;
    }
  }

  submit(form:NgForm){
    const sprintPlanning = form.value;
    this.sprintPlanningService.save(sprintPlanning).subscribe(
      ()=>{
        form.resetForm();
      }
    )
  }
}
