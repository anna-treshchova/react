import { useEffect, useRef, useState} from 'react';
import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import SearchForm from './SearchForm';
import SearchSummary from './SearchSummary';
import { CompactNav } from '@/shared/ui/Nav';

import styles from './SearchPanel.module.scss';

const SearchPanel = ({ openSearch }) => {
    const isMobile = useLayoutStore(state => state.isMobile);
    const formRef = useRef(null);
    const summaryRef = useRef(null);

    const [dimensions, setDimensions] = useState({
        formWidth: 776,
        summaryWidth: 375,
    });

    useEffect(() => {
        if (isMobile) return;

        const observer = new ResizeObserver((entries) => {
            const updates = {}

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

    return (
        <div
            className={styles.panel}
            style={{
                '--form-width': dimensions.formWidth,
                '--summary-width': dimensions.summaryWidth,
                '--form-height': 72,
                '--summary-height': 46,
            }}
        >
            <SearchForm ref={formRef} />

            <SearchSummary ref={summaryRef} openSearch={openSearch} />
            <CompactNav />
        </div>
    )
}

export default SearchPanel;