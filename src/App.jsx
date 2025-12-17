import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateRecipePage } from './pages/CreateRecipePage';
import {RecipeDetailsPage} from "./pages/RecipeDetailsPage.jsx";

function App() {
  return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50">
          <Navbar />
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                  path="/dashboard"
                  element={<DashboardPage />}
              />
              <Route
                  path="/create-recipe"
                  element={<CreateRecipePage />}
              />
              <Route
                  path="/recipes/:id"
                  element={<RecipeDetailsPage />}
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
      </div>
  );
}

export default App;
