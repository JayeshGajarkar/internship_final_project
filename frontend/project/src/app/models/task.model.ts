export interface Task {
    taskId:number;
    title: string;
    description: string;
    status: "To do" | "In progress" | "Done";
    startDate?: Date;
    dueDate?: Date;
    //projectId: number;
    // userId:number;
    comments?:Comment[];
}