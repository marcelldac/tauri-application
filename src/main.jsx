import "./styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'

import LoginManager from './pages/manager/LoginManager'
import DashboardManager from './pages/manager/DashboardManager'
import CreateBuilding from './pages/building/CreateBuilding'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login_manager",
    element: <LoginManager />
  },
  {
    path: "/manager_dashboard",
    element: <DashboardManager />
  },
  {
    path: "/create-building",
    element: <CreateBuilding />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
