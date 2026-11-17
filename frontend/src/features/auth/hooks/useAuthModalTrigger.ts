import { useLayoutEffect } from 'react';
import { useUIStore, selectUIActions } from '@/shared/model/uiStore';
import { isRecord } from '@/shared/lib/type-guards';

interface LocationStateWithAuth {
    openAuthModal?: boolean;
}

const isLocationStateWithAuth = (
    state: unknown
) : state is LocationStateWithAuth => {
    return isRecord(state) && typeof state.openAuthModal === 'boolean';
}

export const useAuthModalTrigger = (state: unknown) => {

    const { openAuthModal } = useUIStore(selectUIActions);

    useLayoutEffect(() => {
        if (!isLocationStateWithAuth(state) || !state.openAuthModal) return;

        openAuthModal()

        const cleanState = { ...state };

        delete cleanState.openAuthModal;

        window.history.replaceState(cleanState, '');
    }, [state, openAuthModal])
}