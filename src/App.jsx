import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DesignEditor from './pages/DesignEditor';
import Calendar from './pages/Calendar';
import Library from './pages/Library';
import DesignDetail from './pages/DesignDetail';
import Login from './pages/Login';
import { DesignProvider } from './context/DesignContext';
import { ScheduleProvider } from './context/ScheduleContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <DesignProvider>
        <ScheduleProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <div className="min-h-screen bg-gray-100">
                      <Navbar />
                      <main className="container mx-auto px-4 py-8">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/editor" element={<DesignEditor />} />
                          <Route path="/editor/:id" element={<DesignEditor />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/library" element={<Library />} />
                          <Route path="/design/:id" element={<DesignDetail />} />
                        </Routes>
                      </main>
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </ScheduleProvider>
      </DesignProvider>
    </AuthProvider>
  );
}

export default App;