import {
    useState,
    useEffect,
    useRef,
    type MouseEvent,
    type AnimationEvent
} from 'react';

type UseModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    onExited?: () => void;
}

export const useModal = ({ isOpen, handleClose, onExited }: UseModalProps) => {
    const [isRendered, setIsRendered] = useState(isOpen);
    const isMouseDownInside = useRef(false);

    useEffect(() => {
        if (isOpen) setIsRendered(true);
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;

        if (!isOpen ) {
            setIsRendered(false);
            onExited?.();
        }
    }

    const handleContentMouseDown = () => {
        isMouseDownInside.current = true;
    }

    const handleOverlayMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            isMouseDownInside.current = false;
        }
    };

    const handleOverlayMouseUp = (e: MouseEvent<HTMLDivElement>) => {
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