import { PictureOutlined } from '@ant-design/icons';
import { getUnsplashUrl, createSrcSet } from './utils.js';
import { imageSizesConfig } from './config.js'
import styles from './OptimizedImage.module.scss';

export const OptimizedImage = ({
    src,
    variant,
    alt = 'Hotel image',
    loading = 'eager',
    decoding = 'async'
}) => {
    if (!src) return (
        <div className={styles.imagePlaceholder}>
            <PictureOutlined />
        </div>
    );

    const sizes = imageSizesConfig[variant] || imageSizesConfig.card;
    const srcSet = createSrcSet(src)
    const defaultSrc = getUnsplashUrl(src, 600);

    return (
        <img
            className={styles.image}
            src={defaultSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={loading}
            decoding={decoding}
        />
    );
};
