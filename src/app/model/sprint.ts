import { Project } from "./project";

export class Sprint {
    sprintId?: {
        projectId: string,
        sprintNo: number;
    }
    startDate?: string;
    endDate?: string;
    totalLoc?: number;
    differentialLoc?: number;
    changedLoc?: number;
    qualityLoc?: number;
    developmentWorkTime?: number;
    comment?: string;
    project?: Project;
}
