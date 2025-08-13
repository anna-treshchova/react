import { useContext, useEffect, useRef, useState } from 'react';

import { smilesData } from '../../data/smiles'

import { ThemeContext } from '../../contexts/ThemeContext';

import SmileList from './components/List';

import styles from './Smiles.module.css'


export default function Smiles() {
    const [showResult, setShowResult] = useState(false)
    const [winners, setWinners] = useState(null);

    const [smiles, setSmiles] = useState(() => {
        try {
            const saved = localStorage.getItem('smiles');
            return saved ? JSON.parse(saved) : smilesData;
        } catch (err) {
            return smilesData;
        }
    });

    const { theme } = useContext(ThemeContext);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        try {
            localStorage.setItem('smiles', JSON.stringify(smiles));
        } catch (err) {
            console.log(`Failed to save smiles to localStorage: ${err}`);
        }
    }, [smiles])

    const addVote = (id) => {
        setSmiles(prevState => prevState.map(smile =>
                smile.id === id ? {...smile, votes: smile.votes + 1} : smile
            )
        )
    }

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

            <SmileList smiles={smiles} addVote={addVote} />

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