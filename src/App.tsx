import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { VHVSnackbarProvider } from './components/vhv';

// Auth Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

// Main Pages
import { Home } from './pages/Home';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

// Account Pages
import { Profile } from './pages/Profile';
import { ChangePassword } from './pages/ChangePassword';

// Settings Pages
import { Devices } from './pages/Devices';
import { Privacy } from './pages/Privacy';
import { Language } from './pages/Language';

// Support Pages
import { HelpCenter } from './pages/HelpCenter';
import { FAQ } from './pages/FAQ';
import { WhatsNew } from './pages/WhatsNew';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { AllComponentsShowcase } from './pages/AllComponentsShowcase';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <VHVSnackbarProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/showcase" element={<ComponentShowcase />} />
              <Route path="/all-components" element={<AllComponentsShowcase />} />

              {/* Protected Routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
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
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/devices"
                element={
                  <ProtectedRoute>
                    <Devices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/privacy"
                element={
                  <ProtectedRoute>
                    <Privacy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/language"
                element={
                  <ProtectedRoute>
                    <Language />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/help"
                element={
                  <ProtectedRoute>
                    <HelpCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <ProtectedRoute>
                    <FAQ />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/whats-new"
                element={
                  <ProtectedRoute>
                    <WhatsNew />
                  </ProtectedRoute>
                }
              />

              {/* Redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </VHVSnackbarProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}