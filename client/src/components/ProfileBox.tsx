import type { BaseProps } from "../types/BaseProps";
import "./styles/ProfileBox.css"
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

type ProfileProps = BaseProps & {
    authorName: string;
    authorUsername: string;
    authorEmail: string;
    authorBio: string;
}

const ProfileBox = ({
    authorName,
    authorUsername,
    authorEmail,
    authorBio,
}: ProfileProps) => {
    const { loggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loggedIn);
    const handleLogout = () => {
        void logout();
        setIsLoggedIn(false);
        navigate("/");
    };
    return (
        <>
            {isLoggedIn && <div>
                <div className="profile-box rounded-lg font-mono">
                    <h2> Author Name: <span className="font-semibold text-red-500">{authorName}</span></h2>
                    <h3> Author Username: <span className="font-semibold text-red-500">{authorUsername}</span></h3>
                    <h3> Author Email: <span className="font-semibold text-red-500">{authorEmail}</span></h3>
                    <hr />
                    <h2 className="text-[20px] font-semibold">Bio Snippet:</h2>
                    <p className="text-md mx-5">{authorBio}</p>
                </div>
                <Button onClick={handleLogout} color="marker-btn-red" className="mt-5 cursor-pointer">Logout</Button>
            </div>}
            {!isLoggedIn && <h2 className="text-[20px] font-semibold text-red-500">Unauthorized</h2>}
        </>
    )
}

export default ProfileBox;