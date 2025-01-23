import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DesignEditor from './pages/DesignEditor';
import Calendar from './pages/Calendar';
import Library from './pages/Library';
import DesignDetail from './pages/DesignDetail';
import { DesignProvider } from './context/DesignContext';
import { ScheduleProvider } from './context/ScheduleContext';

function App() {
  return (
    <DesignProvider>
      <ScheduleProvider>
        <Router>
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
        </Router>
      </ScheduleProvider>
    </DesignProvider>
  );
}

export default App;