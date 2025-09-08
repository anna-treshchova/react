import { Router } from 'express';
import todos from '../data/todos.js';

import { v4 as uuidv4 } from 'uuid';

const router = Router();

//getAllTodos
router.get('/', (req, res) => {
    res.json(todos);
})

router.get('/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === req.params.id);

    if (!todo) {
        return res.status(404).json({ error: 'Sorry, this task does not exist.'})
    }
    res.json(todo);
})

//addTodo
router.post('/', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
        id: uuidv4(),
        title,
        description,
        completed: false
    }

    todos.push(newTodo);

    res.status(201).json(newTodo);
})

//deleteTodo
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Sorry, this task does not exist.'})
    }
    const [ deletedTodo ] = todos.splice(index, 1);  //splice завжди повертає масив видалених елементів, навіть якщо видаляється лише один елемент

    res.json(deletedTodo.id);
})

//toggleTodo
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const checked = req.body.checked;

    const toggledTodo = todos.find(todo => todo.id === id);

    if (!toggledTodo) {
        return res.status(404).json({ error: 'Sorry, this task does not exist.'})
    }
    toggledTodo.completed = checked;

    res.json(toggledTodo);
})

//updateTodo
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;

    const index = todos.findIndex(todo => todo.id === id)

    if (index === -1) {
        return res.status(404).json({ error: 'Sorry, this task does not exist.'})
    }

    todos[index] = {
        id,
        title,
        description,
        completed
    }

    res.json(todos[index]);
})

export default router;

