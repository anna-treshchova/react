import CloseIcon from '../../assets/icons/close.svg?react';
import BackIcon from '../../assets/icons/back.svg?react';

import { useScrollLock } from '../../hooks/useScrollLock';
import { Portal } from '../Portal';
import { CircleButton } from '../CircleButton';

import { useModal } from './useModal.js';
import styles from './Modal.module.scss';

export const Modal = ({
    isOpen,
    handleClose = () => {},
    onExited = () => {},
    handleBack,
    children
}) => {

   const {
       isRendered,
       handleContentMouseDown,
       handleOverlayMouseDown,
       handleOverlayMouseUp,
       handleAnimationEnd
   } = useModal({ isOpen, handleClose, onExited });

    useScrollLock(isOpen);

    if (!isRendered) return null;

    return (
        <Portal>
            <div
                className={styles.overlay}
                data-animation={isOpen ? 'entering' : 'exiting'}
                role='dialog'
                aria-modal='true'
                onMouseDown={handleOverlayMouseDown}
                onMouseUp={handleOverlayMouseUp}
                onAnimationEnd={handleAnimationEnd}
            >
                <div
                    className={styles.window}
                    onMouseDown={handleContentMouseDown}
                >
                    <div className={`${styles.header} ${handleBack ? styles.between : ''}`}>

                        {handleBack && (
                            <CircleButton
                                variant='ghost'
                                size='sm'
                                hover='bg'
                                onClick={handleBack}
                                aria-label='Go back'
                            >
                                <BackIcon />
                            </CircleButton>
                        )}

                        <CircleButton
                            variant='ghost'
                            size='sm'
                            hover='bg'
                            onClick={handleClose}
                            aria-label='Close'
                        >
                            <CloseIcon />
                        </CircleButton>
                    </div>

                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}