import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { increment, decrement, incrementByAmount, reset } from '../../store/actions/counterActions';

export default function CounterRedux() {
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();

    const counter = useSelector((state) => state.counter);

    const handleAddAmount = () => {

        if (!isNaN(+amount)) {
            dispatch(incrementByAmount(+amount))
        }

        setAmount('')
    }

    return(
        <div>
            <h1>Counter: {counter}</h1>
            <div style={{marginBottom: '20px'}}>
                <button onClick={() => dispatch(increment())}>+1</button>
                <button onClick={() => dispatch(decrement())}>-1</button>
            </div>

            <div style={{marginBottom: '20px'}}>
                <input
                    type='text'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder='Enter amount'
                />
                <button onClick={handleAddAmount}>Add</button>
            </div>

            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    )
}