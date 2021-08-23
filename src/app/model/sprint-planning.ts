export class SprintPlanning {
    sprintId?:{
        projectId:string,
        sprintNo: number
    }; 
    poParticipation: boolean;
    devCount: number;
    devPercent: number;
    aspmCount: number;
    aspmPercent: number;
    asmCount: number;
    asmPercent: number;
    eventTime: number;
    comment: string;

    constructor(){
        this.poParticipation = false;
        this.devCount = 0;
        this.devPercent=0;
        this.aspmCount=0;
        this.aspmPercent=0;
        this.asmCount=0;
        this.asmPercent=0;
        this.eventTime=0;
        this.comment='';
    }

}
