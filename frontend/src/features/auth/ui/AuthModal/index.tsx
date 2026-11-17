import { Modal } from '@/shared/ui/Modal';
import {
    useUIStore,
    selectIsAuthModalOpen,
    selectUIActions
} from '@/shared/model/uiStore';

import { AUTH_STEPS } from '../../constants';
import { AuthContent } from '../AuthContent';
import {
    useAuthStore,
    selectAuthStep,
    selectAuthActions
} from '../../model';

export const AuthModal = () => {
    const isAuthModalOpen = useUIStore(selectIsAuthModalOpen);
    const { closeAuthModal } = useUIStore(selectUIActions);

    const step = useAuthStore(selectAuthStep);
    const { goToEmail, reset } = useAuthStore(selectAuthActions);

    return (
        <Modal
            isOpen={isAuthModalOpen}
            handleClose={closeAuthModal}
            onExited={reset}
            handleBack={step === AUTH_STEPS.CODE ? goToEmail : undefined}
        >
            <AuthContent />
        </Modal>
    )
}