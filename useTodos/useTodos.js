import { useEffect, useReducer, useState } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [
	// {
	// 	id: new Date().getTime(),
	// 	description: 'Recolectar la piedra',
	// 	done: false,
	// },
];

const init = () => {
	return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
	const [todos, dispatch] = useReducer(todoReducer, initialState, init);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const onNewTodo = (description) => {
		dispatch({
			type: 'add',
			payload: {
				id: new Date().getTime(),
				description: description,
				done: false,
			},
		});
	};
	const onDeleteTodo = (todo) => {
		dispatch({
			type: 'del',
			payload: todo,
		});
	};
	const onToggleTodo = (todo) => {
		dispatch({
			type: 'mod',
			payload: todo,
		});
	};
	return {
		todos,
		count: todos.length,
		pending: todos.filter((todo) => !todo.done).length,
		onNewTodo,
		onDeleteTodo,
		onToggleTodo,
	};
};
