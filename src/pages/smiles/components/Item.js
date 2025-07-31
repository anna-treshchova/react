import { useContext } from 'react';

import { SmileContext } from '../../../contexts/SmileContext';

import styles from '../SmileVoting.module.css'

export default function SmileItem({ smile }) {
    const { addVote = () => {} } = useContext(SmileContext);

    const handleAddVote = () => addVote(smile.id);

    return (
        <li onClick={handleAddVote} className={styles.smilesItem}>
            <span className={styles.smilesEmoji}>{smile.emoji}</span>
            <span className={styles.smilesVotes}>{smile.votes}</span>
        </li>
    )
}
