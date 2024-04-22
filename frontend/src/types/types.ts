export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    subtasks: { title: string; isComplete: boolean }[];
    progress?: number;
    dueDate?: Date;
    creator_id: string;
    tags: string[]; 
  }