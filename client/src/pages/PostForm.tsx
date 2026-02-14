import Container from "../components/Container";
import Heading1 from "../components/Headings/Heading1";
import TextInput from "../components/TextInput";
import Header from "../layouts/Header";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function PostForm() {

    const { loggedIn } = useAuth();
    const [title, setTitle] = useState<string>("");

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        console.log("title changed")
    }
    return (
        <Container>
            <Header />
            <Heading1>Post Form</Heading1>
            {!loggedIn && <h3 className="text-red-500 font-mono text-[18px]">Unauthorized</h3>}
            {loggedIn && <TextInput type="text" placeholder="Title" label="Title" name="title" onChange={handleChangeTitle} value={title} ></TextInput>}
        </Container>
    )
}