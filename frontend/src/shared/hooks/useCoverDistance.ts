import {
    useEffect,
    useRef,
    type RefObject,
    type Dispatch,
    type SetStateAction
} from 'react';

type CoverDistanceProps = {
    isFirst: boolean;
    saveCoverDistance: Dispatch<SetStateAction<number>>;
}

export const useCoverDistance = (
    { isFirst, saveCoverDistance }: CoverDistanceProps
): RefObject<HTMLDivElement> => {

    const firstCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isFirst || !firstCardRef.current) return;

        const firstCardNode = firstCardRef.current;

        const antCardCoverNode = firstCardNode.querySelector('.ant-card-cover');
        const textNode = firstCardNode.querySelector('#text-content');

        const compiledCardStyles = window.getComputedStyle(firstCardNode);

        const marginBottom = parseFloat(compiledCardStyles.marginBottom);

        const marginTop = antCardCoverNode
            ? parseFloat(window.getComputedStyle(antCardCoverNode).marginTop)
            : 0;

        const textHeight = textNode
            ? Math.floor(textNode.getBoundingClientRect().height)
            : 0;

        saveCoverDistance(marginBottom + marginTop + textHeight);

    }, [isFirst, saveCoverDistance]);

    return firstCardRef;
}