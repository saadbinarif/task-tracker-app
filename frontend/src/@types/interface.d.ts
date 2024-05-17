
export declare global {
    export interface IAction {
        type: string
        payload?: any
    }

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
        progress: number;
        dueDate?: any;
        creator_id: string;
        subtasks: ISubtask[];
        tags: ITag[];
    }

    export interface IUser {
        _id: string;
        email: string,
        isEmailVerified: boolean,
        isTwoFA: boolean,
    }
        
        
        
        

    

    

}