import { useUIStore, selectIsAuthModalOpen, selectUIActions } from '@/shared/model/uiStore';
import { Modal } from '@/shared/ui/Modal';

import { useAuthStore, selectAuthStep, selectAuthActions } from '../../model';
import { STEPS } from '../../constants';
import { AuthContent } from '../AuthContent';

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
            handleBack={step === STEPS.CODE ? goToEmail : null}
        >
            <AuthContent />
        </Modal>
    )
}