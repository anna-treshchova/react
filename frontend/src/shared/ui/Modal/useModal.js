import { useState, useEffect, useRef } from 'react';

export const useModal = ({ isOpen, handleClose, onExited }) => {
    const [isRendered, setIsRendered] = useState(isOpen);
    const isMouseDownInside = useRef(false);

    useEffect(() => {
        if (isOpen) setIsRendered(true);
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    const handleAnimationEnd = () => {
        if (!isOpen) {
            setIsRendered(false);
            onExited();
        }
    }

    const handleContentMouseDown = () => {
        isMouseDownInside.current = true;
    }

    const handleOverlayMouseDown = (e) => {
        if (e.target === e.currentTarget) {
            isMouseDownInside.current = false;
        }
    };

    const handleOverlayMouseUp = (e) => {
        if (isMouseDownInside.current) {
            isMouseDownInside.current = false;
            return;
        }

        if (e.target === e.currentTarget) {
            handleClose()
        }
    };

    return ({
        isRendered,
        handleContentMouseDown,
        handleOverlayMouseDown,
        handleOverlayMouseUp,
        handleAnimationEnd
    })
}