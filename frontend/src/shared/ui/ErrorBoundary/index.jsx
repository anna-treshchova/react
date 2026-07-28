import {useRouteError, useNavigate, isRouteErrorResponse } from 'react-router';
import { Container } from '../Container';
import { GradientButton } from '../GradientButton';
import { Fallback } from '../Fallback';
import styles from './ErrorBoundary.module.scss';

export const ErrorBoundary = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    let title = 'Oops!';
    let description = 'Something went wrong on our end. Please try refreshing the page or go back.';

    if (isRouteErrorResponse(error)) {
        title = error.status || 'Oops!';

        if (typeof error.data === 'string') {
            description = error.data;
        } else if (error.data && typeof error.data === 'object' && error.data.message) {
            description = error.data.message;
        }
    }

    return (
        <Container>
            <div>
                <Fallback
                    variant='error'
                    title={title}
                    description={description}
                >
                    <div className={styles.buttonWrapper}>
                        <GradientButton onClick={() => navigate(-1)}>
                            Return to last page
                        </GradientButton>
                    </div>
                </Fallback>
            </div>
        </Container>
    )
}