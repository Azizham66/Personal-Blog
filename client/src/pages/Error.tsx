import Container from "../components/Container";
import Heading1 from "../components/Headings/Heading1";
import Heading2 from "../components/Headings/Heading2";
import Header from "../layouts/Header";
import { useLocation } from "react-router-dom";

interface ErrorProps {
  error?: string;
}

export default function Error({ error }: ErrorProps) {
  const location = useLocation();
  const errorMessage = location.state?.error || error || "An unknown error occurred";

  return (
    <Container>
      <Header />
      <Heading1 className="text-center mb-8">Error</Heading1>
      <Heading2 className="text-red-600 text-center">
        {errorMessage}
      </Heading2>
    </Container>
  )
}
