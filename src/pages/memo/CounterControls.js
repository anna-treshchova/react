import { memo } from 'react';

import './MemoExample.css';

function CounterControls({
    count,
    increment = () => {},
    decrement = () => {}
}) {
    console.log('[->] Rendering CounterControls')
    return (
        <div className='counter-controls'>
            <h2>Counter Controls</h2>
            <div>
                <button onClick={increment}>Increase</button>
                <span>Count: {count}</span>
                <button onClick={decrement}>Decrease</button>
            </div>

        </div>
    )
}

export default memo(CounterControls);