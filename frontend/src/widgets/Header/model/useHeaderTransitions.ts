import { useLayoutEffect, useRef, type RefObject } from 'react';
import { isRecord } from '@/shared/lib/type-guards';

interface LocationStateWithTransitions {
    disableHeaderTransitions?: boolean;
}

const isLocationStateWithTransitions = (
    state: unknown
) : state is LocationStateWithTransitions => {
    return isRecord(state) && typeof state.disableHeaderTransitions === 'boolean';
}

export type HeaderRootRef = RefObject<HTMLDivElement>;

export const useHeaderTransitions = (state: unknown): HeaderRootRef => {
    const headerRootRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        const element = headerRootRef.current;
        if (!element) return;

        const isDisabledByState =
            isLocationStateWithTransitions(state) &&
            !!state.disableHeaderTransitions;

        const shouldDisableTransitions = isFirstRender.current || isDisabledByState;

        if (shouldDisableTransitions) {
            element.dataset.noTransitions = 'true';

            const timeoutId = setTimeout(() => {
                delete element.dataset.noTransitions;

                if (isDisabledByState) {
                    const cleanState = { ...state };
                    delete cleanState.disableHeaderTransitions;
                    window.history.replaceState(cleanState, '');

                    if (isFirstRender.current) {
                        isFirstRender.current = false;
                    }
                }
            }, 50)

            return () => clearTimeout(timeoutId);
        }
    }, [state]);

    return headerRootRef;
}