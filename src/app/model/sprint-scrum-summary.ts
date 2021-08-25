

export class SprintScrumSummary {
  sprintNoOfTasksAvg:number=0;
  sprintDevCountAvg:number =0;
  sprintDevPercentAvg:number=0;
  sprintAspmCountAvg:number=0;
  sprintAspmPercentAvg:number=0;
  sprintAsmCountAvg:number = 0;
  sprintAsmPercentAvg:number = 0;
  sprintEventTimeAvg:number = 0;
  sprintIssuesRaisedAvg:number = 0;
  sprintPairCountAvg:number = 0;
  sprintPairPercentAvg:number = 0;

  clone(): SprintScrumSummary {
    const newOne = new SprintScrumSummary();
    newOne.sprintNoOfTasksAvg = this.sprintNoOfTasksAvg;
    newOne.sprintDevCountAvg = this.sprintDevCountAvg;
    newOne.sprintDevPercentAvg = this.sprintDevPercentAvg;
    newOne.sprintAspmCountAvg = this.sprintAspmCountAvg;
    newOne.sprintAspmPercentAvg = this.sprintAspmPercentAvg;
    newOne.sprintAsmCountAvg = this.sprintAsmCountAvg;
    newOne.sprintAsmPercentAvg = this.sprintAsmPercentAvg;
    newOne.sprintEventTimeAvg = this.sprintEventTimeAvg;
    newOne.sprintIssuesRaisedAvg = this.sprintIssuesRaisedAvg;
    newOne.sprintPairCountAvg = this.sprintPairCountAvg;
    newOne.sprintPairPercentAvg = this.sprintPairPercentAvg;
    return newOne;
  }
}
