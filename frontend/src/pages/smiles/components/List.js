import SmileItem from './Item';

import styles from '../Smiles.module.css'

export default function SmileList({ smiles = [], addVote }) {

    return <ul className={styles.smilesList}>
        { smiles.map(smile => (
            <SmileItem
                key={smile.id}
                smile={smile}
                addVote={addVote}
            />
        ))}
    </ul>
}
