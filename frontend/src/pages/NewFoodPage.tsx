import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../lib/pocketbase";

const NewFoodPage: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    await pb.collection("food").create({ name });
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <h1>New Food Item</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food Name"
      />
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1em",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1em",
  },
};

export default NewFoodPage;
