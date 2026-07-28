import { useLayoutStore, selectIsAuthModalOpen, selectLayoutActions } from '@/shared/model';
import { Modal } from '@/shared/ui/Modal';

import { useAuthStore, selectAuthStep, selectAuthActions } from '../../model';
import { STEPS } from '../../constants';
import { AuthContent } from '../AuthContent';

export const AuthModal = () => {
    const isAuthModalOpen = useLayoutStore(selectIsAuthModalOpen);
    const { closeAuthModal } = useLayoutStore(selectLayoutActions);

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