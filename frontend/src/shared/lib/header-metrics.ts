import { getSavedScrollY } from '../lib/scroll';
import { PAGE_TYPES, type PageType } from '../lib/page-context';
import type { ScreenType } from '../model/uiStore';

export const TRANSFORM_HEADER_SENTINEL_HEIGHT = {
    mob: 46,
    tab: 10,
    desk: 10
};

const TRANSFORMED_HEADER_HEIGHT = {
    hub: {
        mob: 100,
        tab: 80,
        desk: 100
    },
    other: {
        mob: 80,
        tab: 80,
        desk: 100
    }
};

const TOP_SLOT_HEIGHT = {
    mob: 0,
    tab: 72,
    desk: 76
};

export const getTransformedHeaderHeight = (screen: ScreenType, pageType: PageType) => {
    const headerHeightsByPage = pageType === PAGE_TYPES.hub
        ? TRANSFORMED_HEADER_HEIGHT.hub
        : TRANSFORMED_HEADER_HEIGHT.other

    return headerHeightsByPage[screen];
}

export const getHeaderTransformThreshold = (
    screen: ScreenType,
    pageType: PageType,
    hasTopSlot: boolean
) => {
    switch (pageType) {
        case PAGE_TYPES.hub: {
            const sentinelHeight = TRANSFORM_HEADER_SENTINEL_HEIGHT[screen];
            const topSlotHeight = hasTopSlot ? TOP_SLOT_HEIGHT[screen] : 0;
            return sentinelHeight + topSlotHeight
        }
        case PAGE_TYPES.catalog:
        case PAGE_TYPES.wishlist: {
            return getTransformedHeaderHeight(screen, pageType);
        }
        case PAGE_TYPES.details:
        default: {
            return Infinity;
        }
    }
}

export const hasHeaderPassedTransformThreshold = (
    screen: ScreenType,
    pageType: PageType,
    hasTopSlot: boolean
) => {
    const savedScroll = getSavedScrollY();
    const threshold = getHeaderTransformThreshold(screen, pageType, hasTopSlot);
    return savedScroll > threshold
}