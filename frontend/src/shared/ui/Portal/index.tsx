import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type PortalProps = {
    children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
    return createPortal(children, document.body);
}