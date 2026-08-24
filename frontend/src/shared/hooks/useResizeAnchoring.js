import { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const useResizeAnchoring = ({ items, colSpan }) => {
    const [resizeObserverWindow, setResizeObserverWindow] = useState(0);

    const resizeAnchorIdRef = useRef(null);
    const prevColSpanRef = useRef(colSpan);

    useEffect(() => {
        if (!items || items.length === 0 || resizeObserverWindow === 0) return;

        const vh = window.innerHeight;
        const marginTopResize = Math.round(vh * 0.3);
        const marginBottomResize = Math.round(vh - marginTopResize - resizeObserverWindow);

        const resizeObserver = new IntersectionObserver((entries) => {
            const firstEntry = entries.find(entry => entry.isIntersecting);

            if (firstEntry) {
                resizeAnchorIdRef.current = firstEntry.target.id;
            }
        }, {
            rootMargin: `-${marginTopResize}px 0px -${marginBottomResize}px 0px`,
        })

        const resizeAnchors = document.querySelectorAll('[data-resize-anchor]');
        resizeAnchors.forEach(anchor => resizeObserver.observe(anchor));

        return () => resizeObserver.disconnect();
    }, [items, colSpan, resizeObserverWindow]);

    useLayoutEffect(() => {
        if (prevColSpanRef.current !== colSpan) {
            const targetId = resizeAnchorIdRef.current;

            if (targetId) {
                if (String(targetId) === String(items?.[0]?.id)) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                } else {
                    const targetCard = document.getElementById(targetId);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'instant', block: 'nearest' });
                    }
                }
            }
        }
        prevColSpanRef.current = colSpan;
    }, [colSpan, items]);

    return { resizeObserverWindow, setResizeObserverWindow };
}