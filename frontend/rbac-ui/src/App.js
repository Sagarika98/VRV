import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import './App.css';

function App() {
  return (
    
    <Router>
    <div className="app">
      {/* Header and Navigation Bar */}
      <header className="navbar">
        <div className="logo">RBAC Dashboard</div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            User Management
          </NavLink>
          <NavLink
            to="/roles"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Role Management
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="content">
        <Routes>
          {/* Default Route (User Management) */}
          <Route path="/" element={<UserManagement />} />
          {/* Role Management Page */}
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </main>
    </div>
  </Router>

  );
}

export default App;
