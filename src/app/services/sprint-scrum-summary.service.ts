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
    let totalNoOfTasks = 0;  
    let totalDevCount = 0;
    let totalDevPercent = 0;
    let totalAspmCount = 0;
    let totalAspmPercent = 0;
    let totalAsmCount = 0;
    let totalAsmPercent = 0;
    let totalEventTime = 0;
    let totalIssuesRaised = 0;
    let totalPairCount = 0;
    let totalPairPercent = 0;

    for(let sprint of this.sprintScrums){
      totalNoOfTasks = this.add(totalNoOfTasks,sprint.noOfTasks);
      totalDevCount = this.add(totalDevCount,sprint.devCount);
      totalDevPercent = this.add(totalDevPercent,sprint.devPercent);
      totalAspmCount = this.add(totalAspmCount,sprint.aspmCount);
      totalAspmPercent = this.add(totalAspmPercent,sprint.aspmPercent);
      totalAsmCount = this.add(totalAsmCount,sprint.asmCount);
      totalAsmPercent = this.add(totalAsmPercent,sprint.asmPercent);
      totalEventTime = this.add(totalEventTime,sprint.eventTime);
      totalIssuesRaised = this.add(totalIssuesRaised,sprint.issuesRaised);
      totalPairCount = this.add(totalPairCount,sprint.noOfPairs);
      totalPairPercent = this.add(totalPairPercent,sprint.pairPercent);
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

  add(perviousValue: number,currentValue: number|undefined){
    if(currentValue!= undefined){
      perviousValue += currentValue;
    }else{
      perviousValue += 0;
    }
    return perviousValue;
  }

  getAvarage(value: number) {
    if(value==0){
      return value;
    }else{
      return Math.trunc(value/this.sprintScrums.length);
    }
  }

}
