import { Project } from "./project";
import { Sprint } from "./sprint";

export class DailyScrum {
    dailyScrumId?:{
        sprint:Sprint,
        eventDate?:string
    };

    noOfTasks: number;
    devCount: number;
    devPercent: number;
    aspmCount: number;
    aspmPercent: number;
    asmCount: number;
    asmPercent: number;
    eventTime: number;
    issuesRaised: number;
    noOfPairs: number;
    pairPercent: number;
    comment: string;
    project?: Project;
    
    constructor(){
        this.noOfTasks = 0;
        this.devCount = 0;
        this.devPercent=0;
        this.aspmCount=0;
        this.aspmPercent=0;
        this.asmCount=0;
        this.asmPercent=0;
        this.eventTime=0;
        this.issuesRaised=0;
        this.noOfPairs = 0;
        this.pairPercent=0;
        this.comment='';
    }
}
