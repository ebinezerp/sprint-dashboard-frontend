import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DailyScrum } from '../model/daily-scrum';
import { Sprint } from '../model/sprint';
import { SprintScrumSummary } from '../model/sprint-scrum-summary';
import { DailyScrumService } from './daily-scrum.service';
import { SprintService } from './sprint.service';

@Injectable({
  providedIn: 'root'
})
export class SprintScrumSummaryService {


  sprintScrums: DailyScrum[] =[];
  sprintScrumSummary?: SprintScrumSummary;

  sprintScrumSummaryObservable: Subject<SprintScrumSummary>  = new Subject<SprintScrumSummary>();
  currentScurmObservable: Subject<DailyScrum> = new Subject<DailyScrum>();

  constructor(
    private sprintService:SprintService
    ) {
    this.sprintService.currentSprint.subscribe(
      (sprint) => {
        if(sprint.dailyScrumList!= undefined){
          this.sprintScrums = sprint.dailyScrumList;
          let dailyScrum = new DailyScrum();
          this.sprintScrums.push(dailyScrum);
          this.currentScurmObservable.next(this.getCurrentScrum());
          this.getSprintScrumSummary();
          this.updateSprintCurrentSummary();
        }
      }
    );
  }

  getCurrentScrum(): DailyScrum {
    return this.sprintScrums[this.sprintScrums.length-1];
  }

  replaceCurrentScrum(scrum:DailyScrum ): void {
    this.sprintScrums[this.sprintScrums.length-1] = scrum;
    this.currentScurmObservable.next(scrum);
  }

  replaceSprintScrumSummary(sprintScrumSummary: SprintScrumSummary){
    this.sprintScrumSummary = sprintScrumSummary;
    this.sprintScrumSummaryObservable.next(this.sprintScrumSummary);
  }

  updateSprintCurrentSummary(){
    this.getSprintScrumSummary();
    this.sprintScrumSummaryObservable.next(this.sprintScrumSummary);
  }

  getSprintScrumSummary() {  
    let totalNoOfTasks:number = 0;  
    let totalDevCount:number = 0;
    let totalDevPercent:number = 0;
    let totalAspmCount:number = 0;
    let totalAspmPercent: number = 0;
    let totalAsmCount: number = 0;
    let totalAsmPercent:number = 0;
    let totalEventTime: number = 0;
    let totalIssuesRaised:number = 0;
    let totalPairCount:number = 0;
    let totalPairPercent:number = 0;

    for(let scrum of this.sprintScrums){
      totalNoOfTasks = this.add(totalNoOfTasks, +scrum.noOfTasks);
      totalDevCount = this.add(totalDevCount, +scrum.devCount);
      totalDevPercent = this.add(totalDevPercent, +scrum.devPercent);
      totalAspmCount = this.add(totalAspmCount, +scrum.aspmCount);
      totalAspmPercent = this.add(totalAspmPercent, +scrum.aspmPercent);
      totalAsmCount = this.add(totalAsmCount, +scrum.asmCount);
      totalAsmPercent = this.add(totalAsmPercent, +scrum.asmPercent);
      totalEventTime = this.add(totalEventTime, +scrum.eventTime);
      totalIssuesRaised = this.add(totalIssuesRaised, +scrum.issuesRaised);
      totalPairCount = this.add(totalPairCount, +scrum.noOfPairs);
      totalPairPercent = this.add(totalPairPercent, +scrum.pairPercent);
    }


    const sprintScrumSummary = new SprintScrumSummary();
    sprintScrumSummary.sprintNoOfTasksAvg = this.getAvarage(totalNoOfTasks);
    sprintScrumSummary.sprintDevCountAvg = this.getAvarage(totalDevCount);
    sprintScrumSummary.sprintDevPercentAvg = this.getAvarage(totalDevPercent);
    sprintScrumSummary.sprintAspmCountAvg = this.getAvarage(totalAspmCount);
    sprintScrumSummary.sprintAspmPercentAvg = this.getAvarage(totalAspmPercent)
    sprintScrumSummary.sprintAsmCountAvg = this.getAvarage(totalAsmCount);
    sprintScrumSummary.sprintAsmPercentAvg = this.getAvarage(totalAsmPercent);
    sprintScrumSummary.sprintEventTimeAvg = this.getAvarage(totalEventTime);
    sprintScrumSummary.sprintIssuesRaisedAvg = this.getAvarage(totalIssuesRaised);
    sprintScrumSummary.sprintPairCountAvg = this.getAvarage(totalPairCount);
    sprintScrumSummary.sprintPairPercentAvg = this.getAvarage(totalPairPercent);
    
    this.sprintScrumSummary = sprintScrumSummary;
  }

  add(perviousValue: number,currentValue: number):number{
    return perviousValue+currentValue;
  }

  getAvarage(value: number) {
    if(value==0){
      return value;
    }else{
      return Math.trunc(value/this.sprintScrums.length);
    }
  }

}
