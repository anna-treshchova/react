import { useLayoutEffect } from 'react';
import { useUIStore, selectUIActions } from '@/shared/model/uiStore';

export const useAuthModalTrigger = (state) => {
    const { openAuthModal } = useUIStore(selectUIActions);

    useLayoutEffect(() => {
        if (!state?.openAuthModal) return;

        openAuthModal()

        const cleanState = { ...state };
        delete cleanState.openAuthModal;
        window.history.replaceState(cleanState, '');
    }, [state, openAuthModal])
}