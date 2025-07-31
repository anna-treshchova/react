import { useContext, useState } from 'react';

import SmileList from './components/List';

import { ThemeContext } from '../../contexts/ThemeContext';
import { SmileContext } from '../../contexts/SmileContext';

import styles from './SmileVoting.module.css'

export default function SmileVoting() {
    const [showResult, setShowResult] = useState(false)
    const [winners, setWinners] = useState(null);

    const { theme } = useContext(ThemeContext);
    const { smiles, setSmiles } = useContext(SmileContext);

    const toggleResult = () => {
        const highestVotes = smiles.reduce((acc, smile) => {
            if (acc < smile.votes) {
                acc = smile.votes;
            }
            return acc;
        }, 0)

        if (highestVotes > 0) {
            const newWinners = smiles.filter(smile => smile.votes === highestVotes)
            setWinners(newWinners)
            setShowResult(prevState => !prevState)
        }
    }

    const resetVotes = () => {
        setSmiles(prevState => prevState.map(smile => ({ ...smile, votes: 0 })))
        setShowResult(false)
        setWinners(null)
    }

    return (
        <div
            className={`${styles.smiles}`}
            style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#2b2d30',
                color: theme === 'light' ? '#000000' : '#ffffff',
            }}
        >
            <h1>Which Emoji Reflects Your Feeling?</h1>

            <SmileList smiles={smiles} />

            <div className={styles.btnBox}>
                <button className={styles.resultBtn} onClick={toggleResult}>
                    {!showResult ? 'Show Result' : 'Hide Result'}
                </button>
                <button className={styles.resetBtn} onClick={resetVotes}>Reset</button>
            </div>

            { showResult &&
                <>
                    <h2>Voting results:</h2>
                    <h3>Winners:</h3>
                    <SmileList smiles={winners}/>
                </>
            }
        </div>
    )
}
