// import ReactDOM from 'react-dom/client';
import App from "./App";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

import "./index.css";
//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { pb } from "./lib/pocketbase";

// import App from "./App";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
// import FoodLibraryPage from "./pages/FoodLibraryPage";

// const pb = new PocketBase("https://spaceship.fly.dev");

const Main = () => {
  // // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {

  //   // if (pb.authStore.isValid) {
  //   if (true) {
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = pb.authStore.onChange((token, model) => {
      if (token && model) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      {/*  */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/app" : "/login"} />}
      />
      {/*  */}
      <Route
        path="/app/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" />}
      />
      {/*  */}
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/app" /> : <LoginPage name="Login Page" />
        }
      />
      {/*  */}
      <Route
        path="/login/create-account"
        element={isLoggedIn ? <Navigate to="/app" /> : <CreateAccountPage />}
      />
      {/* <Route path="*" element={<NotFound />} /> Catch-all for 404 */}
      <Route
        path="*"
        element={isLoggedIn ? <Navigate to="/app" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <Router>
    <Main />
  </Router>
  //</React.StrictMode>
);
