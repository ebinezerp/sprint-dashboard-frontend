import { Component, OnInit } from '@angular/core';
import { DailyScrum } from '../model/daily-scrum';
import { Sprint } from '../model/sprint';
import { DailyScrumService } from '../services/daily-scrum.service';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-daily-scrum',
  templateUrl: './daily-scrum.component.html',
  styleUrls: ['./daily-scrum.component.css']
})
export class DailyScrumComponent implements OnInit {

  scrum: DailyScrum;
  sprint?: Sprint;
  sprintScrums: DailyScrum[];

  constructor(
    private sprintService: SprintService,
    private dailyScrumService: DailyScrumService
    ) { 
    this.scrum = new DailyScrum();
    this.sprintScrums = [];
  }

  ngOnInit(): void {
    this.sprintService.sprintSelected.subscribe(
      (sprint) => {
        this.sprint = sprint;
        if(sprint.sprintId != undefined){
          this.dailyScrumService.getSprintScrums(this.sprint.sprintId).subscribe(
            (sprintScrums) =>{
              this.sprintScrums = sprintScrums
            }
          )
        }
      }
    );
  }

}
