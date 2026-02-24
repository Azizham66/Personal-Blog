import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

export default function Login() {
    const { loggedIn, loggingIn, loginError, login } = useAuth();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch {
            navigate("/error", { state: { error: "Login failed. Please try again." } });
        }
    }

    useEffect(() => {
        if (loggedIn) navigate("/")
    }, [loggedIn, navigate])

    return (
        <Container>
            <Header />
            <Heading2>Login</Heading2>
            {loginError && <h3 className="text-red-500">{loginError}</h3>}
            <form onSubmit={handleSubmit}>
                <TextInput 
                    placeholder="Username or email" 
                    label="Username or email" 
                    name="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={loginError ? "error" : ""} />
                <TextInput 
                    placeholder="Password" 
                    label="Password" 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={loginError ? "error" : ""} />
                <Button type="submit" color="marker-btn-blue" className="mt-4">Login</Button>
            </form>
            {loggingIn && <h3>Loading...</h3>}
        </Container>
    )
}