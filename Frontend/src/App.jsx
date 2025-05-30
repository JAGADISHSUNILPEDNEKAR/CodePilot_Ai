import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CodeReview from './pages/CodeReview';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile';
import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";
import rehypeHighlight from "rehype-highlight";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import axios from 'axios';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './pages/Dashboard';
import { ProjectProvider } from './context/ProjectContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Bookmarks from './pages/Bookmarks';

/**
 * App component: the main entry point of the application
 */
export default function App() {
  // State to store the count (not used in this example)
  const [count, setCount] = useState(0);

  // State to store the code (not used in this example)
  const [code, setCode] = useState(`function sum(){ 
  return 1+1
}`);

  // State to store the review (not used in this example)
  const [review, setReview] = useState('');

  // State to store the loading state (not used in this example)
  const [loading, setLoading] = useState(false);

  /**
   * Effect hook to highlight code on mount
   */
  useEffect(() => {
    prism.highlightAll();
  }, []);

  /**
   * Function to review code (not used in this example)
   */
  async function reviewCode() {
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:5000/ai/get-review", { code });
      setReview(response.data);
    } catch (err) {
      setReview("Error fetching review.");
    }
    setLoading(false);
  }

  return (
    // Render the theme provider and router
    <ThemeProvider>
      <ProjectProvider>
        <BookmarkProvider>
          <Router>
            <ThemeToggle />
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="/code-review"
                element={
                  <ProtectedRoute>
                    <CodeReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <Bookmarks />
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
          </Router>
        </BookmarkProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}