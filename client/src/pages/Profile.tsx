import Container from "../components/Container";
import Heading2 from "../components/Headings/Heading2";
import ProfileBox from "../components/ProfileBox";
import { useGetUser } from "../hooks/useGetUser";
import Header from "../layouts/Header";
import "../index.css";

export default function Profile() {
  
  const { user, userLoading, userError } = useGetUser(
    "http://localhost:5000/auth/user",
  );

  return (
    <Container>
      <Header />
      <Heading2>Profile</Heading2>
      {userError && <h3 className="text-red-500">{userError}</h3>}
      {userLoading && <h3>Loading Profile...</h3>}
      {user && (
        <ProfileBox
          authorName={user.name}
          authorUsername={user.username}
          authorEmail={user.email}
          authorBio={user.bio}
        ></ProfileBox>
      )}
      {!user && (
        <h3 className="text-red-500 font-mono text-[18px]">Unauthorized</h3>
      )}
    </Container>
  );
}
