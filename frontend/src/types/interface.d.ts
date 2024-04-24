
export declare global {
    export interface ISubtask {
        _id: string;
        title: string;
        isComplete: boolean;
    }
    
    export interface ITag {
        _id: string;
        tag_name: string;
    }
    
    export interface ITask {
        _id: string;
        title: string;
        description: string;
        status: string;
        progress?: number;
        dueDate?: string;
        creator_id: string;
        subtasks: ISubtask[];
        tags: ITag[];
    }

}