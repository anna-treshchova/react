import { useState, type ComponentPropsWithoutRef } from 'react';
import { PictureOutlined } from '@ant-design/icons';

import { getUnsplashUrl, createSrcSet } from '../../lib/images';
import { imageSizesConfig, type ImageSizeVariant } from '../../config/images';

import styles from './OptimizedImage.module.scss';

type OptimizedImageProps = ComponentPropsWithoutRef<'img'> & {
    src?: string;
    variant: ImageSizeVariant;
    onReady?: () => void;
}
export const OptimizedImage = ({
    src,
    variant,
    alt = 'Hotel image',
    onReady,
    ...props
}: OptimizedImageProps) => {

    const [isLoaded, setIsLoaded] = useState(false);

    if (!src) return (
        <div className={styles.imagePlaceholder}>
            <PictureOutlined />
        </div>
    );

    const sizes = imageSizesConfig[variant] || imageSizesConfig.standardCard;
    const srcSet = createSrcSet(src)
    const defaultSrc = getUnsplashUrl(src, 640);

    const handleLoad = () => {
        setIsLoaded(true);
        onReady?.();
    }

    return (
        <div className={styles.imageWrapper}>
            <img
                {...props}
                className={`${styles.image} ${isLoaded ? styles.visible : ''}`}
                src={defaultSrc}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                onLoad={handleLoad}
            />
            <div className={`${styles.imageSkeleton} ${isLoaded ? styles.hidden : ''}`} />
        </div>
    );
};