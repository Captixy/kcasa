import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import App from "./App";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import AdminLogin from "./admin/Login";
import AdminLayout, { AdminGuard } from "./admin/Layout";
import { ThemeProvider } from "./admin/theme";
import Dashboard from "./admin/Dashboard";
import Testimonials from "./admin/Testimonials";
import Posts from "./admin/Posts";
import Services from "./admin/Services";
import Properties from "./admin/Properties";
import Partners from "./admin/Partners";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route element={<ThemeProvider><Outlet /></ThemeProvider>}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="posts" element={<Posts />} />
              <Route path="services" element={<Services />} />
              <Route path="properties" element={<Properties />} />
              <Route path="partners" element={<Partners />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
