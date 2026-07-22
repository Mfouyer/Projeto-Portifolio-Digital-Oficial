import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.tsx'
import { AdminLayout } from './components/AdminLayout.tsx';
import { Login as AdminLogin } from './pages/admin/Login.tsx';
import { Dashboard } from './pages/admin/Dashboard.tsx';
import { SkillsAdmin } from './pages/admin/Skills.tsx';
import { ProjectsAdmin } from './pages/admin/Projects.tsx';
import { MessagesAdmin } from './pages/admin/Messages.tsx';
import { UserLogin } from './pages/auth/Login.tsx';
import { UserRegister } from './pages/auth/Register.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Profile } from './pages/auth/Profile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "skills",
        element: <SkillsAdmin />,
      },
      {
        path: "projects",
        element: <ProjectsAdmin />,
      },
      {
        path: "messages",
        element: <MessagesAdmin />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" toastOptions={{ className: 'glass', style: { color: '#fff', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' } }} />
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
