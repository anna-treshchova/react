import styles from '../Smiles.module.css'

export default function SmileItem({
    smile,
    addVote = () => {}
}) {
    const handleAddVote = () => addVote(smile.id);

    return (
        <li onClick={handleAddVote} className={styles.smilesItem}>
            <span className={styles.smilesEmoji}>{smile.emoji}</span>
            <span className={styles.smilesVotes}>{smile.votes}</span>
        </li>
    )
}
