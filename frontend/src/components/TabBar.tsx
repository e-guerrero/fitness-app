import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TabBar.module.css";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tabToBeSet: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tabToBeSet: string) => {
    setActiveTab(tabToBeSet);
    switch (tabToBeSet) {
      case "Eat":
        navigate("/app/eat");
        break;
      case "Train":
        navigate("/app/train");
        break;
      case "Profile":
        navigate("/app/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.tabBar}>
      {["Eat", "Train", "Profile"].map((tabToBeSet) => (
        <button
          key={tabToBeSet}
          className={styles.tabButton}
          style={{
            // fontWeight: activeTab === tabToBeSet ? "bold" : "normal",
            color: activeTab === tabToBeSet ? "blue" : "black",
          }}
          onClick={() => handleTabClick(tabToBeSet)}
        >
          {tabToBeSet}
        </button>
      ))}
    </div>
  );
};

// const styles: { [key: string]: React.CSSProperties } = {
//   tabBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: "10%",
//     display: "flex",
//     justifyContent: "space-around",
//     backgroundColor: "#fff",
//     borderTop: "1px solid #ccc",
//     zIndex: 1000,
//   },
//   tabButton: {
//     flex: 1,
//     border: "none",
//     background: "none",
//     fontSize: "1.2em",
//     cursor: "pointer",
//     outline: "none",
//   },
// };

export default TabBar;
