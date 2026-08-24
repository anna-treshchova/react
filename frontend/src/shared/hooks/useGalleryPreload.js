import { useState, useEffect, useRef} from 'react';

export const useGalleryPreload = (imagesToPreload) => {
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);
    const galleryRef = useRef(null);

    useEffect(() => {
        if (!galleryRef.current) return;

        let isMounted = true;
        let frameId;

        const domImages = Array.from(galleryRef.current.querySelectorAll('img'));

        if (domImages.length === 0) {
            setIsGalleryLoading(false);
            return;
        }

        const firstViewImages = domImages.slice(0, imagesToPreload);

        Promise.all(
            firstViewImages.map((img) => img.decode().catch(() => null))
        ).then(() => {
            if (isMounted) {
                frameId = requestAnimationFrame(() => {
                    setIsGalleryLoading(false);
                });
            }
        });

        return () => {
            isMounted = false;
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [imagesToPreload]);

    return { isGalleryLoading, galleryRef };
}