import SmileItem from './Item';

import styles from '../SmileVoting.module.css'

export default function SmileList({ smiles = [] }) {

    return <ul className={styles.smilesList}>
        { smiles.map(smile => (
            <SmileItem
                key={smile.id}
                smile={smile}
            />
        ))}
    </ul>
}
