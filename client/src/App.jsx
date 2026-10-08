import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ReportIncident from './pages/ReportIncident.jsx';
import MyReports from './pages/MyReports.jsx';
import ReportDetails from './pages/ReportDetails.jsx';
import CyberSafety from './pages/CyberSafety.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports/new"
      element={
        <ProtectedRoute>
          <ReportIncident />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <MyReports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports/:id"
      element={
        <ProtectedRoute>
          <ReportDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cyber-safety"
      element={
        <ProtectedRoute>
          <CyberSafety />
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
);

export default App;
