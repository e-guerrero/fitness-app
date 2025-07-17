import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EatDashboard.module.css";

const EatDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.nutritionData}
        onClick={() => navigate("nutritional-data")}
      >
        Nutritional Data
      </button>

      <div className={styles.firstRowContainer}>
        <button
          className={styles.calendar}
          onClick={() => navigate("calendar")}
        >
          Calendar
        </button>

        <div className={styles.columnContainer}>
          <button
            className={styles.kitchenInventory}
            onClick={() => navigate("kitchen-inventory")}
          >
            Kitchen Inventory
          </button>

          <button
            className={styles.recipes}
            onClick={() => navigate("recipes")}
          >
            Recipes
          </button>
        </div>
      </div>

      <button
        className={styles.groceries}
        onClick={() => navigate("groceries")}
      >
        Groceries
      </button>

      <div className={styles.secondRowContainer}>
        <button
          className={styles.restaurants}
          onClick={() => navigate("places")}
        >
          Restaurants
        </button>

        <button
          className={styles.foodLibrary}
          onClick={() => navigate("food-library")}
        >
          Food Library
        </button>
      </div>
    </div>
  );
};

export default EatDashboard;
