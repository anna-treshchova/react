import { Container } from '@/shared/ui/Container';
import { Fallback } from '@/shared/ui/Fallback';

export const ExperiencesPage = () => {
    return (
        <Container>
            <Fallback
                variant='soon'
                title='Coming soon'
                description="We're working on this page. Check back soon."
            />
        </Container>
    )
}