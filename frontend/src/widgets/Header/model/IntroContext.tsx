import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';

import {
    useContentIntro,
    INTRO_STATUS,
    type IntroStatus
} from '@/shared/hooks/useContentIntro';

import { useHeaderIntro } from './useHeaderIntro';

type IntroContextValue = {
    introStatus: IntroStatus;
    handleLottieLoad: () => void;
}

interface IntroProviderProps {
    children: ReactNode;
}

export const IntroContext = createContext<IntroContextValue | null>(null);

export const IntroProvider = ({ children }: IntroProviderProps) => {
    const [ introStatus, setIntroStatus ] = useState<IntroStatus>('pending');

    const handleLottieLoad = useHeaderIntro({ introStatus, setIntroStatus })

    return (
        <IntroContext.Provider value={{ introStatus, handleLottieLoad }}>
            {children}
        </IntroContext.Provider>
    )
}

export const useIntroContext = () => {
    const context = useContext(IntroContext);

    if (!context) {
        throw new Error('useIntroContext must be used within IntroProvider.')
    }
    return context
}