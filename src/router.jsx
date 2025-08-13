import { createBrowserRouter } from 'react-router-dom'
import App from './App'
// signup
import LoginPage from './pages/store/signup/LoginPage'
import SignupUserInfoPage from './pages/store/signup/SignupUserInfoPage.jsx'
import SignupAccountInfoPage from './pages/store/signup/SignupAccountInfoPage.jsx'
import SignupTermsPage from './pages/store/signup/SignupTermsPage'
import SelectMarketPage from './pages/store/signup/SelectMarketPage'
import StoreNamePage from './pages/store/signup/StoreNamePage'
import StoreAddressPage from './pages/store/signup/StoreAddressPage'
import StorePhonePage from './pages/store/signup/StorePhonePage'
import StoreCategoryMainPage from './pages/store/signup/StoreCategoryMainPage'
import StoreCategorySubPage from './pages/store/signup/StoreCategorySubPage'
import StoreImagePage from './pages/store/signup/StoreImagePage'
import StoreKeywordPage1 from './pages/store/signup/StoreKeywordPage1'
import StoreKeywordPage2 from './pages/store/signup/StoreKeywordPage2'
import SignupLoadingPage from './pages/store/signup/SignupLoadingPage'
import SignupCompletePage from './pages/store/signup/SignupCompletePage'
import StoreHomePage from './pages/store/signup/StoreHomePage'
// menu
import MenuPage from './pages/MenuPage'
import MenuMenualPage from './pages/MenuManualPage'
import MenuUploadPage from './pages/MenuUploadPage'
import MenuUploadPreviewPage from './pages/MenuUploadPreviewPage'
import MenuExtractLoadingPage from './pages/MenuExtractLoadingPage'
import MenuExtractFailPage from './pages/MenuExtractFailPage'
import MenuAllergensLoadingPage from './pages/MenuAllergensLoadingPage.jsx'
import MenuAllergensFailPage from './pages/MenuAllergensFailPage.jsx'
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
        path: 'signup/store-name',
        element: <StoreNamePage />,
      },
      {
        path: 'signup/store-address',
        element: <StoreAddressPage />,
      },
      {
        path: 'signup/store-phone',
        element: <StorePhonePage />,
      },
      {
        path: 'signup/store-category-main',
        element: <StoreCategoryMainPage />,
      },
      {
        path: 'signup/store-category-sub',
        element: <StoreCategorySubPage />,
      },
      {
        path: 'signup/store-image',
        element: <StoreImagePage />,
      },
      {
        path: 'signup/store-keyword1',
        element: <StoreKeywordPage1 />,
      },
      {
        path: 'signup/store-keyword2',
        element: <StoreKeywordPage2 />,
      },
      {
        path: 'signup/loading',
        element: <SignupLoadingPage />,
      },
      {
        path: 'signup/complete',
        element: <SignupCompletePage />,
      },
      {
        path: 'store/home',
        element: <StoreHomePage />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'menu/manual',
        element: <MenuMenualPage />,
      },
      {
        path: 'menu/upload',
        element: <MenuUploadPage />,
      },
      {
        path: 'menu/upload/preview',
        element: <MenuUploadPreviewPage />,
      },
      {
        path: '/menu/extract/loading',
        element: <MenuExtractLoadingPage />,
      },
      {
        path: '/menu/extract/fail',
        element: <MenuExtractFailPage />,
      },
      {
        path: '/menu/allergens/loading',
        element: <MenuAllergensLoadingPage />,
      },
      {
        path: '/menu/allergens/fail',
        element: <MenuAllergensFailPage />,
      },
    ],
  },
])

export default router
