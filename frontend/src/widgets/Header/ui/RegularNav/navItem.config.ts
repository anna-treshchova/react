import type { NavRoute } from '../../model';

type MarginConfig = {
    mt?: number;
    mr?: number;
    mb?: number;
    ml?: number;
}

export type NavItemConfig = {
    speed: number;
    lottieMargins?: Partial<Record<'mobile' | 'desktop', MarginConfig>>;
    itemMargins?: Partial<Record<'mobile' | 'desktop', MarginConfig>>;
    skeletonMargins?: Partial<Record<'mobile' | 'desktop', MarginConfig>>;
}

export const navItemConfig = {
    homes: {
        speed: 4,
        lottieMargins: {
            mobile: { mb: 2 },
            desktop: { mb: 4, mr: -4 }
        },
        skeletonMargins: {
            mobile: { ml: 2 },
            desktop: { ml: 3, mb: 2 }
        }
    },
    experiences: {
        speed: 1.6,
        lottieMargins: {
            desktop: { mb: 2, mr: -8},
        },
        skeletonMargins: {
            mobile: { ml: 3 },
            desktop: { ml: 4, mt: 4, mb: 6 }
        },
        itemMargins: {
            desktop: { ml: -6 },
        }
    },
    services: {
        speed: 1.6,
        lottieMargins: {
            mobile: { mb: 6 },
            desktop: { mb: 6, mr: -2 },
        },
        skeletonMargins: {
            mobile: { mt: 10, ml: 6 },
            desktop: { mt: 10, ml: 7, mb: 2 }
        },
    }
} as const satisfies Record<string, NavItemConfig>;

type Margins = {
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
}

const getMargins = (marginsConfig?: MarginConfig): Margins => {
    const { mt = 0, mr = 0, mb = 0, ml = 0 } = marginsConfig || {};

    return {
        marginTop: mt,
        marginRight: mr,
        marginBottom: mb,
        marginLeft: ml,
    }
}

export type NavItemStyles = {
    lottieStyles: Margins & {
        width: number;
        height: number;
    },
    skeletonStyles: Margins,
    itemStyles: Margins
}

export const getNavItemStyles = (
    itemConfig: NavItemConfig,
    baseSize: NavRoute['iconSize'],
    isMobile: boolean
): NavItemStyles => {
    const lottieMarginsConfig = isMobile
        ? itemConfig.lottieMargins?.mobile
        : itemConfig.lottieMargins?.desktop;

    const skeletonMarginsConfig = isMobile
        ? itemConfig.skeletonMargins?.mobile
        : itemConfig.skeletonMargins?.desktop;

    const itemMarginsConfig = isMobile
        ? itemConfig.itemMargins?.mobile
        : itemConfig.itemMargins?.desktop;

    const iconSize = isMobile ? baseSize - 6 : baseSize;

    return {
        lottieStyles: {
            width: iconSize,
            height: iconSize,
            ...getMargins(lottieMarginsConfig)
        },
        skeletonStyles: {
            ...getMargins(skeletonMarginsConfig)
        },
        itemStyles: {
            ...getMargins(itemMarginsConfig),
        }
    };
};