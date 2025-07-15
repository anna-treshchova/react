import SmileItem from './Item';

export default function SmileList({ smiles = [], addVote }) {
    return <ul className='smiles__list'>
        { smiles.map(smile => (
            <SmileItem
                key={smile.id}
                smile={smile}
                addVote={addVote}
            />
        ))}
    </ul>
}
