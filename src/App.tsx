//App.tsx
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import PrivateRoute from "./components/PrivateRoute";

import DictionaryPage from "./pages/DictionaryPage/DictionaryPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import RestrictedRoute from "./components/RestrictedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/dictionary" component={RegisterPage} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/dictionary" component={LoginPage} />}
        />

        <Route
          path="/"
          element={<PrivateRoute redirectTo="/register" component={Layout} />}
        >
          <Route index element={<DictionaryPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
