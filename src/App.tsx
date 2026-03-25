import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserDetail from './pages/UserDetail';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
