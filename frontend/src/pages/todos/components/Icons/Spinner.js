import styles from '../Item/Item.module.scss';

export default function Spinner() {
    return (
        <span className={styles.spinner}>
            <svg
                width='28px'
                height='28px'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
            >
                <g>
                    <path d='M4.97498 12H7.89998' />
                    <path d='M11.8 5V8' />
                    <path d='M18.625 12H15.7' />
                    <path d='M11.8 19V16' />
                    <path d='M6.97374 16.95L9.04203 14.8287' />
                    <path d='M6.97374 7.05001L9.04203 9.17133' />
                    <path d='M16.6262 7.05001L14.5579 9.17133' />
                    <path d='M16.6262 16.95L14.5579 14.8287' />
                </g>
            </svg>
        </span>
    )
}