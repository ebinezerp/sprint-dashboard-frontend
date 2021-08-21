

export class SprintScrumSummary {
  sprintNoOfTasksAvg=0;
  sprintDevCountAvg =0;
  sprintDevPercentAvg=0;
  sprintAspmCountAvg=0;
  sprintAspmPercentAvg=0;
  sprintAsmCountAvg = 0;
  sprintAsmPercentAvg = 0;
  sprintEventTimeAvg = 0;
  sprintIssuesRaisedAvg = 0;
  sprintPairCountAvg = 0;
  sprintPairPercentAvg = 0;

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
