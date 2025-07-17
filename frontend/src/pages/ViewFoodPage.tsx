import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pb } from "../lib/pocketbase";

const ViewFoodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      if (id) {
        const record = await pb.collection("food").getOne(id);
        setFood(record);
        setName(record.name);
      }
    };

    fetchFood();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (id) {
      await pb.collection("food").update(id, { name });
      setIsEditing(false);
      navigate(-1);
    }
  };

  if (!food) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>
        {isEditing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          food.name
        )}
      </h1>
      <p>Created: {food.created}</p>
      <div style={styles.buttonContainer}>
        <button onClick={handleEdit}>{isEditing ? "Cancel" : "Edit"}</button>
        {isEditing && <button onClick={handleSave}>Save</button>}
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

export default ViewFoodPage;
