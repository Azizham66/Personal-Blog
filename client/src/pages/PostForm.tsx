import Container from "../components/Container";
import Heading1 from "../components/Headings/Heading1";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Header from "../layouts/Header";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import TextEditor from "../components/TextEditor";
import { API_URL } from "../config/api";
import { useAddPost } from "../hooks/useAddPost.ts";
import { useNavigate } from "react-router-dom";

export default function PostForm() {

    const refetch = async (): Promise<void> => {
        // implement actual refetch logic as needed; returning a Promise satisfies the hook's type
      };

    const navigate = useNavigate();

    const { loggedIn } = useAuth();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [author] = useState<string>("Abdulaziz Hamzah");
    const [titleError, setTitleError] = useState<string>("");
    const [contentError, setContentError] = useState<string>("");
    const { adding, error, addPost } = useAddPost(`${API_URL}/api/posts`, refetch);
    const [tagsString, setTagsString] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (e.target.value.trim()) {
            setTitleError("");
        }
    }

    const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsString(e.target.value);
        const tags = e.target.value.split(",").map(tag => tag.trim());
        setTags(tags);
    }
    const validateForm = (): boolean => {
        let isValid = true;
        
        if (!title.trim()) {
            setTitleError("Title is required");
            isValid = false;
        }
        
        if (!content.trim()) {
            setContentError("Content is required");
            isValid = false;
        }
        
        return isValid;
    };
    
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        
        await addPost({ title, content, tags, author });
        if (error) {
            navigate("/error", { state: { error } });
        } 
        if (!adding && !error) {
            navigate("/posts")
        }
    }

    const handleChangeContent = (data: string) => {
        setContent(data);
        if (data.trim()) {
            setContentError("");
        }
    }
    return (
        <Container>
            <Header />
            <div className="max-w-4xl mx-auto w-full">
                <Heading1 className="text-center mb-8">Create New Post</Heading1>
                {!loggedIn && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                        <h3 className="text-red-600 font-semibold text-lg">Unauthorized</h3>
                        <p className="text-red-500 mt-2">Please log in to create a post</p>
                    </div>
                )}
                {loggedIn && (
                    <div className="bg-white p-6 border-3 border-marker-black rounded-lg shadow-[3px_3px_0_0_#111827]">
                        <form className="space-y-6">
                            <TextInput 
                                type="text" 
                                placeholder="Title" 
                                label="Title*" 
                                name="title" 
                                onChange={handleChangeTitle} 
                                value={title}
                                error={titleError}
                            />
                            <div>
                                <label className="font-semibold text-xl font-mono block mt-4 mb-1 mx-1">
                                    Content*
                                </label>
                                <TextEditor onChangeContent={handleChangeContent}/>
                                {contentError && (
                                    <p className="text-red-500 text-sm mt-1">{contentError}</p>
                                )}
                            </div>
                            <div>
                                <TextInput
                                    type="text"
                                    placeholder='Tags separated by a comma ", "'
                                    label="Tags (Separated by a comma)"
                                    name="tags"
                                    onChange={handleChangeTags}
                                    value={tagsString}
                                />
                            </div>
                            <div className="flex justify-end space-x-4 pt-6">
                                <Button
                                    type="button"
                                    color="marker-btn-default"
                                    onClick={() => navigate("/posts")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    color="marker-btn-blue"
                                    onClick={handleSubmit}
                                >
                                    Publish Post
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Container>
    )
}