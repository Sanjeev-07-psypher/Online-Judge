import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import Dashboard from "../../pages/Dashboard";
import Problems from "../../pages/Problems";
import ProblemDetail from "../../pages/ProblemDetail";
import Submissions from "../../pages/Submissions";
import Leaderboard from "../../pages/Leaderboard";
import Profile from "../../pages/Profile";
import SubmissionDetail from "../../pages/SubmissionDetail";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <Problems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <Submissions />
            </ProtectedRoute>
          }
        />

        <Route
  path="/submissions/:id"
  element={
    <ProtectedRoute>
      <SubmissionDetail />
    </ProtectedRoute>
  }
/>

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;