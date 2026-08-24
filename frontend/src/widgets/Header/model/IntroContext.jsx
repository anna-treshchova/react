import { createContext, useContext, useState } from 'react';
import { useHeaderIntro } from './useHeaderIntro';

export const IntroContext = createContext(null);

export const IntroProvider = ({ children }) => {
    const [ introStatus, setIntroStatus ] = useState('pending'); //'pending' | 'ready' | 'done';

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