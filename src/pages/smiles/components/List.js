import React from 'react';

import SmileItem from "./Item";

class SmileList extends React.Component {
    render() {
        return <ul className='smiles__list'>
            {this.props.smiles.map((smile) => (
                <SmileItem
                    key={smile.id}
                    smile={smile}
                    addVote={this.props.addVote}
                />
            ))}
        </ul>
    }
}

export default SmileList;