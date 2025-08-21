const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.payload]
        default: return state;
    }
}

export default todoReducer;