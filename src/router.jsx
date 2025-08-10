import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import SignupUser from './pages/SignupUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: 'signup/info',
        element: <SignupUser />,
      },
    ],
  },
])

export default router
