import { createBrowserRouter } from 'react-router-dom'
import App from './App'

//onboarding
import SelectLanguagePage from './pages/onboarding/SelectLanguagePage'
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

// hours
import HoursPage from './pages/store/hours/HoursPage.jsx'
import HoursEditPage from './pages/store/hours/HoursEditPage.jsx'

// description
import DescriptionPage from './pages/store/description/DescriptionPage'
import SummaryEditPage from './pages/store/description/SummaryEditPage'
import DetailEditPage from './pages/store/description/DetailEditPage'

// map
import MainMapPage from './pages/customer/map/MainMapPage'
import MapStorePage from './pages/customer/map/MapStoresPage'

// overview
import OverviewPage from './pages/customer/overview/OverviewPage.jsx'
import OverviewInfo from './pages/customer/overview/OverviewInfoPage.jsx'
import OverviewInfo1 from './pages/customer/overview/OverviewInfoPage1.jsx'
import OverviewInfo2 from './pages/customer/overview/OverviewInfoPage2.jsx'
import OverviewInfo3 from './pages/customer/overview/OverviewInfoPage3.jsx'
import OverviewInfo4 from './pages/customer/overview/OverviewInfoPage4.jsx'
import OverviewInfo5 from './pages/customer/overview/OverviewInfoPage5.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SelectLanguagePage /> },
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
      {
        path: '/hours',
        element: <HoursPage />,
      },
      {
        path: '/hours/edit',
        element: <HoursEditPage />,
      },
      {
        path: '/store/description',
        element: <DescriptionPage />,
      },
      {
        path: '/store/description/summary-edit',
        element: <SummaryEditPage />,
      },
      {
        path: '/store/description/detail-edit',
        element: <DetailEditPage />,
      },
      {
        path: '/user/map',
        element: <MainMapPage />,
      },
      {
        path: '/user/map/store',
        element: <MapStorePage />,
      },
      {
        path: '/user/overview',
        element: <OverviewPage />,
      },
      {
        path: '/user/overview/info',
        element: <OverviewInfo />,
      },
      {
        path: '/user/overview/info/1',
        element: <OverviewInfo1 />,
      },
      {
        path: '/user/overview/info/2',
        element: <OverviewInfo2 />,
      },
      {
        path: '/user/overview/info/3',
        element: <OverviewInfo3 />,
      },
      {
        path: '/user/overview/info/4',
        element: <OverviewInfo4 />,
      },
      {
        path: '/user/overview/info/5',
        element: <OverviewInfo5 />,
      },
    ],
  },
])

export default router
