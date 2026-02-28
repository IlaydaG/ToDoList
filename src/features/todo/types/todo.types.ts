export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    deadline?: string;
    color?: string;
}

export type TodoFilterType = 'All' | 'Active' | 'Completed';
