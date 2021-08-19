export class DailyScrum {
    dailyScrumId?:{
        sprintId?:{
            projectId?:string,
            sprintNo?: number;
        },
        eventDate?:string
    };

    noOfTasks?: number;
    devCount?: number;
    devPercent?: number;
    aspmCount?: number;
    aspmPercent?: number;
    asmCount?: number;
    asmPercent?: number;
    eventTime?: number;
    issuesRaised?: number;
    noOfPairs?: number;
    pairPercent?: number;
    comment?: string;
    
    constructor(){
        this.devPercent=0;
        this.aspmPercent=0;
        this.asmPercent=0;
        this.pairPercent=0;
    }
}
