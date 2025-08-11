import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LoginPage from './pages/LoginPage'
import SignupUserInfoPage from './pages/SignupUserInfoPage.jsx'
import SignupAccountInfoPage from './pages/SignupAccountInfoPage.jsx'
import SignupTermsPage from './pages/SignupTermsPage'
import SelectMarketPage from './pages/SelectMarketPage'
import StoreAddressPage from './pages/StoreAddressPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        path: 'signup/userinfo',
        element: <SignupUserInfoPage />,
      },
      {
        path: 'signup/accountinfo',
        element: <SignupAccountInfoPage />,
      },
      {
        path: 'signup/terms',
        element: <SignupTermsPage />,
      },
      {
        path: 'signup/select-market',
        element: <SelectMarketPage />,
      },
      {
        path: 'signup/store-address',
        element: <StoreAddressPage />,
      },
    ],
  },
])

export default router
