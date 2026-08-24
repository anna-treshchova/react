import { useEffect } from 'react';

import { useUIStore } from '../model/uiStore';
import { getPageContext } from '../lib/page-context';

import { saveScrollRestorationMeta, clearScrollRestorationMeta } from '../lib/scroll';
import { getHeaderTransformThreshold, getTransformedHeaderHeight } from '../lib/header-metrics';

export const useReloadAnchoring = ({ items, hasTopSlot }) => {
    useEffect(() => {
      const handleBeforeLoad = () => {
          if (!items) {
              clearScrollRestorationMeta();
              return;
          }

          if (items.length === 0) {
              saveScrollRestorationMeta(0, null);
              return;
          }

          const screen = useUIStore.getState().screen;
          const { pageType } = getPageContext(window.location.pathname, window.location.search);

          if (window.scrollY <= getHeaderTransformThreshold(screen, pageType, hasTopSlot)) {
              clearScrollRestorationMeta();
              return;
          }

          const vh = window.innerHeight;
          const headerHeight = getTransformedHeaderHeight(screen, pageType);
          const reloadAnchors = document.querySelectorAll('[data-reload-anchor]');

          let visibleCardsCount = 0;
          let firstVisibleCardTop = null;

          for (let i = 0; i < reloadAnchors.length; i++) {
              const rect = reloadAnchors[i].getBoundingClientRect();

              if (rect.top > vh) break;

              if (rect.bottom > headerHeight && rect.top < vh) {
                  visibleCardsCount++;

                  if (firstVisibleCardTop == null) {
                      firstVisibleCardTop = rect.top;
                  }
              }
          }

          if (visibleCardsCount > 0 && firstVisibleCardTop !== null) {
              saveScrollRestorationMeta(visibleCardsCount, firstVisibleCardTop);
          }
      }

      window.addEventListener('beforeunload', handleBeforeLoad);

      return () => window.removeEventListener('beforeunload', handleBeforeLoad);
    }, [items, hasTopSlot])
}