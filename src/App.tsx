//App.tsx
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./pages/MainPage/MainPage";
import DictionaryPage from "./pages/DictionaryPage/DictionaryPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import RestrictedRoute from "./components/RestrictedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/" component={RegisterPage} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={LoginPage} />}
        />

        <Route
          path="/"
          element={<PrivateRoute redirectTo="/register" component={Layout} />}
        >
          <Route index element={<MainPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
