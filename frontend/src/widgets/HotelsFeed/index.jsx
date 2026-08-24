import { useCallback } from 'react';

import { useColSpan } from '@/shared/hooks/useColSpan';
import { useResizeAnchoring } from '@/shared/hooks/useResizeAnchoring';
import { useReloadAnchoring } from '@/shared/hooks/useReloadAnchoring';
import { useContentIntro } from '@/shared/hooks/useContentIntro.js';
import { Fallback } from '@/shared/ui/Fallback';

import { HotelsList, HotelsListSkeleton } from '@/entities/hotels';

import styles from './HotelsFeed.module.scss';

export const HotelsFeed = ({
    hotels,
    variant = 'medium',

    isLoading = false,
    hasTopSlot = false,

    emptySlot = <Fallback variant='empty' />,
    errorSlot = <Fallback variant='error' />,

    ...listProps
}) => {
    const { colSpan, aboveTheFoldCount } = useColSpan(variant);

    const {
        resizeObserverWindow,
        setResizeObserverWindow
    } = useResizeAnchoring({ items: hotels, colSpan });

    const {
        criticalImagesCount,
        handleImageLoad
    } = useContentIntro({ items: hotels, aboveTheFoldCount });

    useReloadAnchoring({ items: hotels, hasTopSlot });

    const renderResizeAnchor = useCallback((content, id) => (
        <div
            id={id}
            data-resize-anchor
            className={styles.anchorCandidate}
        >
            {content}
        </div>
    ), []);


    if (isLoading) {
        return <HotelsListSkeleton variant={variant} />
    }

    if (!hotels) return errorSlot;

    if (hotels.length === 0) return emptySlot;

    return (
        <div style={{'--anchor-scroll-margin-bottom': `${resizeObserverWindow}px`}}>
            <HotelsList
                hotels={hotels}

                colSpan={colSpan}
                criticalImagesCount={criticalImagesCount}

                onImageReady={handleImageLoad}
                saveCoverDistance={setResizeObserverWindow}
                renderCover={renderResizeAnchor}

                {...listProps}
            />
        </div>
    )
}