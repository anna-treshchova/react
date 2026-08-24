const IMAGE_WIDTHS = [320, 640, 960, 1200];

export const getUnsplashUrl = (url, width = 640, quality = 80) => {
    if (!url) return '';

    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('w', width.toString());
        urlObj.searchParams.set('q', quality.toString());
        urlObj.searchParams.set('auto', 'format');
        urlObj.searchParams.set('fit', 'crop');

        return urlObj.toString();
    } catch {
        return url;
    }
};

export const createSrcSet = (src) => {
    return IMAGE_WIDTHS.map(
        (width) => `${getUnsplashUrl(src, width)} ${width}w`
    ).join(', ');
}