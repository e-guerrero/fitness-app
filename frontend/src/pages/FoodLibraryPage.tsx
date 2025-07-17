import React from "react";
// import { pb } from "../lib/pocketbase";
import styles from "./FoodLibraryPage.module.css";
import { useNavigate } from "react-router-dom";

const FoodLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  // const [currentTab, setCurrentTab] = useState("default");
  // const [foodData, setFoodData] = useState<any[]>([]);

  // useEffect(() => {
  //   pb.collection("food")
  //     .getFullList({ sort: "name" })
  //     .then((records) => {
  //       console.log(records);
  //       setFoodData(records);
  //     });
  // }, []);

  // return (
  //   <div className={styles.container}>
  //     <h1>Food Library</h1>
  //     <div className={styles.tabBar}>
  //       <button
  //         className={currentTab === "default" ? styles.active : ""}
  //         onClick={() => setCurrentTab("default")}
  //       >
  //         Default
  //       </button>
  //       <button
  //         className={currentTab === "custom" ? styles.active : ""}
  //         onClick={() => setCurrentTab("custom")}
  //       >
  //         Custom
  //       </button>
  //       <button
  //         className={currentTab === "all" ? styles.active : ""}
  //         onClick={() => setCurrentTab("all")}
  //       >
  //         All
  //       </button>
  //     </div>
  //     <div className={styles.list}>
  //       {foodData.map((food, index) => (
  //         <div key={index} className={styles.listItem}>
  //           <h2>{food.name}</h2>
  //           <p>{food.created}</p>
  //         </div>
  //       ))}
  //     </div>
  //     <div>
  //       <button>New</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.navBar}>
          <button>Back</button>
          <h1>Food Library</h1>
        </div>

        <div className={styles.listTabBar}>
          <button>Default</button>
          <button>Custom</button>
          <button>All</button>
        </div>
      </div>

      <ul className={styles.content}>
        {Array.from({ length: 100 }, (_, i) => (
          <li key={i}>
            <button>Item {i + 1}</button>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <button onClick={() => navigate("new-food")}>New</button>
      </div>
    </div>
  );
};

export default FoodLibraryPage;
