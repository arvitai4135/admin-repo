import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, lazy, Suspense, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthProvider, AuthContext } from './context/AuthContext';
import Plans from "./components/Plans.jsx";

const Dashboard = lazy(() => import("./components/Dashboard.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Signup = lazy(() => import("./components/Signup.jsx"));
const BlogEditor = lazy(() => import("./components/tiptapEditor/TiptapEditor.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Booking = lazy(() => import("./pages/Booking.jsx"));

const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));

const theme = createTheme();

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/" replace />;
};



function App() {
  const [blogContent, setBlogContent] = useState("");

  const handleSaveBlog = (blogData) => {
    console.log("Blog saved:", blogData);
    // Here you would typically send the data to your backend
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<CircularProgress style={{ display: "block", margin: "50px auto" }} />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="booking" element={<Booking />} />
                <Route path="plans" element={<Plans />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blog" element={<Blog />} />
              </Route>
              <Route
                path="/editor"
                element={
                  <ProtectedRoute>
                    
                      <BlogEditor 
                        initialContent={blogContent} 
                        onSave={handleSaveBlog} 
                        />
                        
                        
                    
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;