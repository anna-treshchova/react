import { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';

import { getUnsplashUrl, createSrcSet } from '../../lib/images';
import { imageSizesConfig } from '../../config/images';

import styles from './OptimizedImage.module.scss';

export const OptimizedImage = ({
    src,
    variant,
    alt = 'Hotel image',
    loading = 'eager',
    fetchPriority = 'auto',
    onReady
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!src) return (
        <div className={styles.imagePlaceholder}>
            <PictureOutlined />
        </div>
    );

    const sizes = imageSizesConfig[variant] || imageSizesConfig.card;
    const srcSet = createSrcSet(src)
    const defaultSrc = getUnsplashUrl(src, 640);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onReady) onReady();
    }

    return (
        <div className={styles.imageWrapper}>
            <img
                className={`${styles.image} ${isLoaded ? styles.visible : ''}`}
                src={defaultSrc}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                loading={loading}
                fetchpriority={fetchPriority}
                onLoad={handleLoad}
            />
            <div className={`${styles.imageSkeleton} ${isLoaded ? styles.hidden : ''}`} />
        </div>
    );
};
