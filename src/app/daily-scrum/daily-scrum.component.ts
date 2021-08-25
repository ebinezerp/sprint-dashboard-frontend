import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DailyScrum } from '../model/daily-scrum';
import { SprintScrumSummary } from '../model/sprint-scrum-summary';
import { User } from '../model/user';
import { DailyScrumService } from '../services/daily-scrum.service';
import { SprintScrumSummaryService } from '../services/sprint-scrum-summary.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-daily-scrum',
  templateUrl: './daily-scrum.component.html',
  styleUrls: ['./daily-scrum.component.css']
})
export class DailyScrumComponent implements OnInit {

  message?: string;
  scrum: DailyScrum;
  usersList: User[] = [];
  devTotalCount: number =0;
  aspmTotalCount: number =0;
  asmTotalCount: number =0;
  pairTotalCount: number =0;
  devCounter:any[]=[];
  aspmCounter:any[]=[];
  asmCounter:any[]=[];
  pairCounter:any[]=[]
  sprintScrumSummary: SprintScrumSummary;
  actualSprintScrumSummary: SprintScrumSummary;
  
  constructor(
    private userService: UserService,
    private sprintScrumSummaryService: SprintScrumSummaryService,
    private dailyScrumService: DailyScrumService,
    private router: Router
    ) {
  
    this.scrum = new DailyScrum();

    this.router.events.subscribe(
      (event: Event) => {
          if(event instanceof NavigationStart){
            if(this.scrum!= undefined){
              sessionStorage.setItem('scrum', JSON.stringify(this.scrum));
              sessionStorage.setItem('sprintScrumSummary',JSON.stringify(this.sprintScrumSummary));
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
        this.devCounter = new Array(this.devTotalCount);
        this.aspmTotalCount = this.userService.getAspmTotalCount();
        this.aspmCounter = new Array(this.aspmTotalCount);
        this.asmTotalCount = this.userService.getAsmTotalCount();
        this.asmCounter = new Array(this.asmTotalCount);
        this.pairTotalCount = this.userService.getPairCount();
        this.pairCounter = new Array(this.pairTotalCount);
      } 
    );


    const sprintScrumSummaryStr = sessionStorage.getItem('sprintScrumSummary');
    if(sprintScrumSummaryStr!=null){
      this.sprintScrumSummary = JSON.parse(sprintScrumSummaryStr);
    }



    const scrumStr = sessionStorage.getItem('scrum');
    if(scrumStr != null){
      this.scrum = JSON.parse(scrumStr);
      this.sprintScrumSummaryService.replaceCurrentScrum(this.scrum);
    }else{
      this.sprintScrumSummaryService.currentScurmObservable.subscribe(
        (scrum)=> {
          this.scrum = scrum;
        }
      )
    }

    this.sprintScrumSummaryService.sprintScrumSummaryObservable.subscribe(
      (sprintScrumSummary) => {
        this.sprintScrumSummary = sprintScrumSummary;
      }
    )

  }


  calDevPercent(){
    let devCount = this.scrum.devCount;
    if(devCount != 0){
      this.scrum.devPercent = (devCount *100)/this.devTotalCount;
    }else{
      this.scrum.devPercent = 0;
    }
    this.updateCall();
  }


  calAspmPercent(){
    let aspmCount = this.scrum.aspmCount;
    if(aspmCount != 0){
      this.scrum.aspmPercent = (aspmCount*100)/this.aspmTotalCount;
    }else{
      this.scrum.aspmPercent = 0;
    }
    this.updateCall();
  }

  calAsmPercent() {
    let asmCount = this.scrum.asmCount;
    if(asmCount != 0){
      this.scrum.asmPercent = (asmCount*100)/this.asmTotalCount;
    }else{
      this.scrum.asmPercent = 0;
    }
    this.updateCall();
  }

  calNoOfPairsAvg(){
    let noOfPairs = this.scrum.noOfPairs;
    if(noOfPairs != 0){
      this.scrum.noOfPairs = (noOfPairs*100)/this.pairTotalCount;
    }else{
      this.scrum.noOfPairs = 0;
    }
    this.updateCall();
  }

  updateCall(){
    this.sprintScrumSummaryService.updateSprintCurrentSummary();
  }


  submit(scrumForm: NgForm){
    let scrum: DailyScrum = scrumForm.value;
    scrum.dailyScrumId = this.scrum.dailyScrumId;
    this.dailyScrumService.save(scrum).subscribe(
      ()=>{
        this.message = 'Daily Scrum details are added sccessfully';
        scrumForm.resetForm();
      }
    )
  }

}
