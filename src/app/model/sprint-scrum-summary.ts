import { SprintScrumSummaryService } from "../services/sprint-scrum-summary.service";


export class SprintScrumSummary {
  sprintNoOfTasks=0;
  sprintDevCount =0;
  sprintDevPercent=0;
  sprintAspmCount=0;
  sprintAspmPercent=0;
  sprintAsmCount = 0;
  sprintAsmPercent = 0;
  sprintEventTime = 0;
  sprintIssuesRaised = 0;
  sprintPairCount = 0;
  sprintPairPercent = 0;

  clone(): SprintScrumSummary {
    const newOne = new SprintScrumSummary();
    newOne.sprintNoOfTasks = this.sprintNoOfTasks;
    newOne.sprintDevCount = this.sprintDevCount;
    newOne.sprintDevPercent = this.sprintDevPercent;
    newOne.sprintAspmCount = this.sprintAspmCount;
    newOne.sprintAspmPercent = this.sprintAspmPercent;
    newOne.sprintAsmCount = this.sprintAsmCount;
    newOne.sprintAsmPercent = this.sprintAsmPercent;
    newOne.sprintEventTime = this.sprintEventTime;
    newOne.sprintIssuesRaised = this.sprintIssuesRaised;
    newOne.sprintPairCount = this.sprintPairCount;
    newOne.sprintPairPercent = this.sprintPairPercent;
    return newOne;
  }
}
