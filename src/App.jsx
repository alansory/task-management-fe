import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../src/styles/tailwind.css';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Layout from './components/Layout/Layout';
import Dashboard from './views/Dashboard';
import { 
  TaskList,  
  TaskDetail,
  TaskCreate
} from './views/Task'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = window.localStorage.getItem("user_traits");

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  }, [user, navigate]);

  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/tasks/create" element={<TaskCreate />} />
                  <Route path="/tasks/:id" element={<TaskDetail />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


