//App.tsx
import { Route, Routes } from "react-router-dom";

import "./App.css";
import NotFoundPage from "./assets/pages/NotFoundPage/NotFoundPage";
import RestrictedRoute from "./components/PrivateRoute";
import PrivateRoute from "./components/PrivateRoute";

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
