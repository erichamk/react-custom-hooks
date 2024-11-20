export const todoReducer = (state, action) => {
	switch (action.type) {
		case 'add':
			return [...state, action.payload];
		case 'del':
			return state.filter((todo) => todo.id !== action.payload.id);
		case 'mod':
			return state.map((todo) => {
				if (action.payload.id === todo.id) {
					return {
						...todo,
						done: !todo.done,
					};
				}
				return todo;
			});

		default:
			return state;
	}
};
