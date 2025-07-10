import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import SmileList from './components/List';
import './SmileVoting.css'

class SmileVoting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smiles: [
                { id: uuidv4(), emoji: '😁', votes: 0 },
                { id: uuidv4(), emoji: '😉', votes: 0 },
                { id: uuidv4(), emoji: '😐', votes: 0 },
                { id: uuidv4(), emoji: '😪', votes: 0 },
                { id: uuidv4(), emoji: '😠', votes: 0 },
            ],
            showResult: false,
            winners: null,
        }
    }

    toggleResult = () => {
        const highestVotes = this.state.smiles.reduce((acc, smile) => {
            if (acc < smile.votes)  {
                acc = smile.votes;
            }
            return acc;
        }, 0)

        if (highestVotes > 0) {
            const winners = this.state.smiles.filter(smile => smile.votes === highestVotes)
            this.setState({
                winners,
                showResult: !this.state.showResult,
            });
        }
    }

    addVote = (id) => {
        this.setState((prevState) => {
            const updatedSmiles = prevState.smiles.map((smile) => {
                if (smile.id === id) {
                    return { ...smile, votes: smile.votes + 1 };
                }
                return smile;
            })
            return {smiles: updatedSmiles};
        })
    }

    resetVotes = () => {
        const resetSmiles = this.state.smiles.map((smile) => ({
            ...smile,
            votes: 0
        }))

        this.setState({
            smiles: resetSmiles,
            showResult: false,
            winners: null,
        })
    }

    render() {
        return (
            <div className='smiles'>
                <h1>Which Emoji Reflects Your Feeling?</h1>

                <SmileList
                    smiles={this.state.smiles}
                    addVote={this.addVote}
                />

                <div className='smiles__btn-box'>
                    <button className='result-btn' onClick={this.toggleResult}>
                        {!this.state.showResult ? 'Show Result' : 'Hide Result'}
                    </button>
                    <button className='reset-btn' onClick={this.resetVotes}>Reset</button>
                </div>

                {this.state.showResult &&
                    <>
                        <h2>Voting results:</h2>
                        <h3>Winners:</h3>
                        <SmileList smiles={this.state.winners}/>
                    </>
                }
            </div>
        )
    }
}

export default SmileVoting;