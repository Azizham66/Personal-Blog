import Container from '../components/Container';
import Heading1 from '../components/Headings/Heading1';
import Header from '../layouts/Header';
import './styles/About.css'

export default function About() {
    return (
        <Container>
            <Header />
            <Heading1>About Page</Heading1>
        </Container>
    )
}