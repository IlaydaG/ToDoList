import type {  Todo } from '../types/todo.types';

const STORAGE_KEY = 'todo_app_data';

export const storage = {
    getTodos: (): Todo[] => {
    try {
        if (typeof window === 'undefined') return [];

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) return [];

        return JSON.parse(data) as Todo[];
    } catch (error) {
        console.error('Error reading from localStorage', error);
        return [];
    }
},

    saveTodos: (todos: Todo[]): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }
};
