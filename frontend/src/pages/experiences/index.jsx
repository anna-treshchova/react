import Container from '@/app/layout/components/Container';
import { EmptyState, comingSoon } from '@/shared/ui/EmptyState';

const ExperiencesPage = () => {
    return (
        <Container>
            <EmptyState
                image={comingSoon}
                imageWidth={400}
                title='Coming soon'
                description="We're working on this page. Check back soon."
            />
        </Container>
    )
}

export default ExperiencesPage;