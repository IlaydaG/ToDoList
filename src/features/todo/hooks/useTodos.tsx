import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Todo, TodoFilterType } from '../types/todo.types';
import { storage } from '../utils/storage';
import { getRandomSoftColor } from '../utils/colors';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => storage.getTodos());
    const [filter, setFilter] = useState<TodoFilterType>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        storage.saveTodos(todos);
    }, [todos]);

    const addTodo = useCallback((title: string, description?: string, deadline?: string) => {
        if (!title.trim()) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            title: title.trim(),
            ...(description?.trim() ? { description: description.trim() } : {}),
            completed: false,
            createdAt: new Date().toISOString(),
            color: getRandomSoftColor(),
            ...(deadline ? { deadline: new Date(deadline).toISOString() } : {})
        };

        setTodos((prev) => [...prev, newTodo]);
    }, []);

    const toggleTodo = (id: string) => {
    setTodos(function (prevTodos) {
        return prevTodos.map(function (todo) {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            } else {
                return todo;
            }
        });
    });
};

    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter(todo => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter(todo => !todo.completed));
    }, []);

    const updateTodo = useCallback((id: string, newTitle: string, newDescription?: string) => {
        if (!newTitle.trim()) return;
        setTodos((prev) =>
            prev.map(todo =>
                todo.id === id ? {
                    ...todo,
                    title: newTitle.trim(),
                    description: newDescription?.trim() ? newDescription.trim() : undefined
                } : todo
            )
        );
    }, []);

    const filteredTodos = useMemo(() => {
        let result = [...todos];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(todo =>
                todo.title.toLowerCase().includes(query) ||
                (todo.description && todo.description.toLowerCase().includes(query))
            );
        }

        if (filter === 'Active') {
            result = result.filter(todo => !todo.completed);
        } else if (filter === 'Completed') {
            result = result.filter(todo => todo.completed);
        }

        return result.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    }, [todos, filter, searchQuery]);

    const activeCount = useMemo(() => {
        return todos.filter(todo => !todo.completed).length;
    }, [todos]);

    return {
        todos: filteredTodos,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        activeCount,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
    };
};
