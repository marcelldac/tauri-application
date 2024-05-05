import "./styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'

import LoginManager from './pages/manager/LoginManager'

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
    element: (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Manager Dashboard</h1>
        <Link to='/'>Sair</Link>
      </div>
    )
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
