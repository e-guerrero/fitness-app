import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TabBar from "./components/TabBar";
import EatDashboard from "./components/EatDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import FoodLibraryPage from "./pages/FoodLibraryPage";
import styles from "./App.module.css";
import NewFoodPage from "./pages/NewFoodPage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Eat");

  const renderTabRoutes = () => {
    switch (activeTab) {
      case "Eat":
        return (
          <Routes>
            <Route path="/" element={<Navigate to="eat" />} />
            <Route path="eat" element={<EatDashboard />} />
            <Route
              path="eat/nutritional-data"
              element={<PlaceholderPage name="Nutritional Data" />}
            />
            <Route
              path="eat/calendar"
              element={<PlaceholderPage name="Calendar" />}
            />
            <Route
              path="eat/kitchen-inventory"
              element={<PlaceholderPage name="Kitchen Inventory" />}
            />
            <Route
              path="eat/recipes"
              element={<PlaceholderPage name="Recipes" />}
            />
            <Route
              path="eat/groceries"
              element={<PlaceholderPage name="Groceries" />}
            />
            <Route
              path="eat/places"
              element={<PlaceholderPage name="Places" />}
            />
            <Route path="eat/food-library" element={<FoodLibraryPage />} />
            <Route path="eat/food-library/new-food" element={<NewFoodPage />} />
          </Routes>
        );
      case "Train":
        return <PlaceholderPage name="Train Content" />;
      case "Profile":
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderTabRoutes()}</div>
      <div className={styles.lower}>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
