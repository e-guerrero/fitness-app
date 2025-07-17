import React from "react";

interface PlaceholderPageProps {
  name: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ name }) => {
  return (
    <div style={styles.container}>
      <h1>{name}</h1>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1em",
  },
};

export default PlaceholderPage;
