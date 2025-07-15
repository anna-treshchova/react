export default function SmileItem({ smile, addVote = () => {} }) {
    const handleAddVote = () => addVote(smile.id);

    return (
        <li onClick={handleAddVote} className='smiles__item'>
            <span className='smiles__emoji'>{smile.emoji}</span>
            <span className='smiles__votes'>{smile.votes}</span>
        </li>
    )
}
