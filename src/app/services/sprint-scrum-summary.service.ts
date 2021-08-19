import { Injectable } from '@angular/core';
import { DailyScrum } from '../model/daily-scrum';
import { SprintScrumSummary } from '../model/sprint-scrum-summary';
import { DailyScrumService } from './daily-scrum.service';
import { SprintService } from './sprint.service';

@Injectable({
  providedIn: 'root'
})
export class SprintScrumSummaryService {


  sprintScrums: DailyScrum[] = [];
  
  constructor(
    private sprintService:SprintService,
    private dailyScrumService: DailyScrumService
    ) {
    this.sprintService.currentSprint.subscribe(
      (sprint) => {
        this.dailyScrumService.getSprintScrums(sprint.sprintId).subscribe(
          (dailyScrums)=>{
            this.sprintScrums = dailyScrums;
          }
        )
      }
    )
  }

  getSprintScrumSummary(): SprintScrumSummary {
    const sprintScrumSummary = new SprintScrumSummary();

    for(let sprint of this.sprintScrums){
      sprintScrumSummary.sprintDevCount = this.add(sprintScrumSummary.sprintDevCount,sprint.devCount);
      sprintScrumSummary.sprintDevPercent = this.add(sprintScrumSummary.sprintDevPercent,sprint.devPercent);
      sprintScrumSummary.sprintAspmCount = this.add(sprintScrumSummary.sprintAspmCount,sprint.aspmCount);
      sprintScrumSummary.sprintAspmPercent = this.add(sprintScrumSummary.sprintAspmPercent,sprint.aspmPercent);
      sprintScrumSummary.sprintAsmCount = this.add(sprintScrumSummary.sprintAsmCount,sprint.asmCount);
      sprintScrumSummary.sprintAsmPercent = this.add(sprintScrumSummary.sprintAsmPercent,sprint.asmPercent);
      sprintScrumSummary.sprintEventTime = this.add(sprintScrumSummary.sprintEventTime,sprint.eventTime);
      sprintScrumSummary.sprintIssuesRaised = this.add(sprintScrumSummary.sprintIssuesRaised,sprint.issuesRaised);
      sprintScrumSummary.sprintNoOfTasks = this.add(sprintScrumSummary.sprintNoOfTasks,sprint.noOfTasks);
      sprintScrumSummary.sprintPairCount = this.add(sprintScrumSummary.sprintPairCount,sprint.noOfPairs);
      sprintScrumSummary.sprintPairPercent = this.add(sprintScrumSummary.sprintPairPercent,sprint.pairPercent);
    }
    return sprintScrumSummary;
  }

  add(perviousValue: number,currentValue: number|undefined){
    if(currentValue!= undefined){
      perviousValue += currentValue;
    }else{
      perviousValue += 0;
    }
    return perviousValue;
  }

}
