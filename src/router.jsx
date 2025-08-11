import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import SignupUserInfo from './pages/SignupUserInfo.jsx'
import SignupAccountInfo from './pages/SignupAccountInfo.jsx'
import SignupTerms from './pages/SignupTerms'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: 'signup/userinfo',
        element: <SignupUserInfo />,
      },
      {
        path: 'signup/accountinfo',
        element: <SignupAccountInfo />,
      },
      {
        path: 'signup/terms',
        element: <SignupTerms />,
      },
    ],
  },
])

export default router
