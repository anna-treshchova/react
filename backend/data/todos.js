import { v4 as uuidv4 } from 'uuid';

let todos = [
    {
        id: uuidv4(),
        title: 'Finish hw30.1',
        description: 'Complete the task and push the changes to GitHub',
        completed: false
    },
    {
        id: uuidv4(),
        title: 'Gym session',
        description: 'Upper body workout',
        completed: true
    },
    {
        id: uuidv4(),
        title: 'Finish book chapter',
        description: 'Read and complete the current chapter',
        completed: false
    },
    {
        id: uuidv4(),
        title: 'English speaking practice',
        description: 'Call with a native speaker',
        completed: true
    }
]

export default todos;