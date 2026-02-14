import Container from '../components/Container';
import Heading1 from '../components/Headings/Heading1';
import Header from '../layouts/Header';
import Heading2 from '../components/Headings/Heading2';
import './styles/About.css'

export default function About() {
    return (
        <Container>
            <Header />
            <Heading1>WHO AM I? (ABOUT ME)</Heading1>
            <p className="text-md font-mono m-5 mr-0">Hello! I'm Abdulaziz, a college student pursuing my CE degree. 
                I like to call myself a full-stack engineer, basically, I write some nonsense and you get a user interface, an API or both. 
                I love AI, and I'm aiming to become a data scientist or ML engineer, chasing the dream of working in big tech. 
                When I'm not geeking out over AI, you'll find me gaming, building both useful and useless applications, 
                diving into theoretical CS, or tinkering with computer hardware. If I don't pick up your call… well, I'm probably busy trying to solve the P vs NP problem.
            </p>
            <Heading2 className="font-semibold">My Skills()</Heading2>
            <ul className='font-mono'>
                <li>* React.js, TypeScript, Tailwind, Next.js</li>
                <li>* Responsive design, Pixel perfect implementation, Clean code</li>
                <li>* Node.js, Express.js, MongoDB, MySQL</li>
                <li>* Git, Github</li>
                <li>* Basic Docker and CI/CD (Still learning)</li>
                <li>* Drinking a lot of coffee</li>
            </ul>
        </Container>
    )
}