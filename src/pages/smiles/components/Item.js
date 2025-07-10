import React from 'react';

class SmileItem extends React.Component {
    handleAddVote = () => {
        this.props.addVote?.(this.props.smile.id) // optional chaining
    }

   render() {
       const { smile } = this.props;
        return (
           <li onClick={this.handleAddVote} className='smiles__item'>
               <span className='smiles__emoji'>{smile.emoji}</span>
               <span className='smiles__votes'>{smile.votes}</span>
           </li>
       )
   }
}

export default SmileItem;