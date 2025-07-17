import React from "react";
import { pb } from "../lib/pocketbase";

// interface ProfilePageProps {
//   name: string;
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ name }) => {
const ProfilePage: React.FC = () => {
  const handleLogout = async () => {
    pb.authStore.clear();
  };

  return (
    <div style={styles.container}>
      <h1>Profile Page</h1>
      <h1>
        {pb.authStore.model?.firstName + " " + pb.authStore.model?.lastName}
      </h1>
      <h1>{"Username: " + pb.authStore.model?.username}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1em",
  },
};

export default ProfilePage;
