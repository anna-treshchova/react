import { useLayoutEffect, useRef } from 'react';

export const useHeaderTransitions = (state) => {
    const headerRootRef = useRef(null);
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        const element = headerRootRef.current;
        if (!element) return;

        const shouldDisableTransitions = isFirstRender.current || state?.disableHeaderTransitions;

        if (shouldDisableTransitions) {
            element.dataset.noTransitions = 'true';

            const timeoutId = setTimeout(() => {
                delete element.dataset.noTransitions;

                if (state?.disableHeaderTransitions) {
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