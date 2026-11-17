import { useEffect, useRef, useState, type JSX } from 'react';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import type { CSSPropertiesWithVars } from '@/shared/styles/types';

import { SearchForm, type SearchFormProps } from '../SearchForm';
import { SearchSummary, type SearchSummaryProps } from '../SearchSummary';

import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
    expandHeader: SearchSummaryProps['onClick'];
    onSubmit: SearchFormProps['onSubmit'];
    compactNavSlot: JSX.Element;
}

export const SearchPanel = ({
    expandHeader,
    onSubmit,
    compactNavSlot
}: SearchPanelProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    const isMobile = useUIStore(selectIsMobile);

    const [dimensions, setDimensions] = useState({
        formWidth: 776,
        summaryWidth: 375,
    });

    useEffect(() => {
        if (isMobile) return;

        const observer = new ResizeObserver((entries) => {
            const updates: Partial<typeof dimensions> = {};

            entries.forEach(entry => {
                const width = Math.round(entry.borderBoxSize?.[0]?.inlineSize);

                if (width) {
                    if (entry.target === formRef.current) updates.formWidth = width;
                    if (entry.target === summaryRef.current) updates.summaryWidth = width;
                }
            })

            if (Object.keys(updates).length > 0) {
                setDimensions(prev => ({...prev, ...updates }));
            }
        })

        if (formRef.current) observer.observe(formRef.current);
        if (summaryRef.current) observer.observe(summaryRef.current);

        return () => observer.disconnect()
    }, [isMobile])

    const panelStyle: CSSPropertiesWithVars = {
        '--form-width': dimensions.formWidth,
        '--summary-width': dimensions.summaryWidth,
        '--form-height': 72,
        '--summary-height': 46,
    }

    return (
        <div
            className={styles.panel}
            style={panelStyle}
        >
            <SearchForm ref={formRef} onSubmit={onSubmit} />
            <SearchSummary ref={summaryRef} onClick={expandHeader} />
            {compactNavSlot}
        </div>
    )
}