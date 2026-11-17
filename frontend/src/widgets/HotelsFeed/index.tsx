import { useCallback, type JSX, type CSSProperties } from 'react';

import { useColSpan, type ColLayoutVariant } from '@/shared/hooks/useColSpan';
import { useResizeAnchoring } from '@/shared/hooks/useResizeAnchoring';
import { useReloadAnchoring } from '@/shared/hooks/useReloadAnchoring';
import { useContentIntro } from '@/shared/hooks/useContentIntro';
import { Fallback } from '@/shared/ui/Fallback';

import {
    HotelsList,
    HotelsListSkeleton,
    type HotelListProps,
    type Hotel
} from '@/entities/hotels';

import styles from './HotelsFeed.module.scss';

type HotelsFeedProps = {
    hotels: Hotel[] | undefined;
    variant?: ColLayoutVariant;

    isLoading?: boolean;
    hasTopSlot?: boolean;

    emptySlot?: JSX.Element;
    errorSlot?: JSX.Element;
} & Omit<
    HotelListProps,
    | 'hotels'
    | 'colSpan'
    | 'criticalImagesCount'
    | 'onImageReady'
    | 'saveCoverDistance'
    | 'renderCover'
>

type CustomCSSProperties = CSSProperties & {
    '--anchor-scroll-margin-bottom': string;
};

export const HotelsFeed = ({
    hotels,
    variant = 'medium',

    isLoading = false,
    hasTopSlot = false,

    emptySlot = <Fallback variant='empty' />,
    errorSlot = <Fallback variant='error' />,

    ...listProps
}: HotelsFeedProps) => {
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

    const renderResizeAnchor = useCallback((
        content: JSX.Element,
        id: Hotel['id']
    ): JSX.Element => (
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

    const style: CustomCSSProperties = {
        '--anchor-scroll-margin-bottom': `${resizeObserverWindow}px`
    }

    return (
        <div style={style}>
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