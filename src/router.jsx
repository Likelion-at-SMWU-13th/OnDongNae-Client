import { createBrowserRouter } from 'react-router-dom'
import App from './App'

//onboarding
import SelectLanguagePage from './pages/onboarding/SelectLanguagePage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import OnboardingPage1 from './pages/onboarding/OnboardingPage1'
import OnboardingPage2 from './pages/onboarding/OnboardingPage2'
import OnboardingPage3 from './pages/onboarding/OnboardingPage3'
import OnboardingPage4 from './pages/onboarding/OnboardingPage4'
import OnboardingPage5 from './pages/onboarding/OnboardingPage5'
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
import MenuPage from './pages/store/menu/MenuPage.jsx'
import MenuMenualPage from './pages//store/menu/MenuManualPage'
import MenuUploadPage from './pages//store/menu/MenuUploadPage'
import MenuExtractLoadingPage from './pages/store/menu/MenuExtractLoadingPage'
import MenuExtractSuccessPage from './pages/store/menu/MenuExtractSuccessPage'
import MenuExtractSavePage from './pages/store/menu/MenuExtractSavePage'
import MenuExtractFailPage from './pages/store/menu/MenuExtractFailPage'
import MenuAllergensLoadingPage from './pages/store/menu/MenuAllergensLoadingPage.jsx'
import MenuAllergensFailPage from './pages/store/menu/MenuAllergensFailPage.jsx'
import MenuAllergensSuccessPage from './pages/store/menu/MenuAllergensSuccessPage'
import MenuAllergensApplyPage from './pages/store/menu/MenuAllergensApplyPage'
import MenuCorrectPage from './pages/store/menu/MenuCorrectPage'
// hours
import HoursPage from './pages/store/hours/HoursPage.jsx'
import HoursEditPage from './pages/store/hours/HoursEditPage.jsx'
// description
import DescriptionPage from './pages/store/description/DescriptionPage'
import SummaryEditPage from './pages/store/description/SummaryEditPage'
import DetailEditPage from './pages/store/description/DetailEditPage'
// mystore
import MyStorePage from './pages/store/mystore/MyStorePage'
import MyStoreInfoPage from './pages/store/mystore/MyStoreInfoPage'
import MyStoreEditPage from './pages/store/mystore/MyStoreEditPage'
import MyStoreWithdrawPage from './pages/store/mystore/MyStoreWithdrawPage'
// map
import MainMapPage from './pages/customer/map/MainMapPage'
import MapStoresPage from './pages/customer/map/MapStoresPage'
// overview
import OverviewPage from './pages/customer/overview/OverviewPage.jsx'
import OverviewInfo1 from './pages/customer/overview/OverviewInfoPage1.jsx'
import OverviewInfo2 from './pages/customer/overview/OverviewInfoPage2.jsx'
import OverviewInfo3 from './pages/customer/overview/OverviewInfoPage3.jsx'
import OverviewInfo4 from './pages/customer/overview/OverviewInfoPage4.jsx'
import OverviewInfo5 from './pages/customer/overview/OverviewInfoPage5.jsx'
//rates
import ExchangeRatePage from './pages/customer/rates/ExchangeRatePage'
//course
import CoursePage from './pages/customer/course/CoursePage.jsx'
import CourseAIPage from './pages/customer/course/CourseAIPage'
import CourseLoading from './pages/customer/course/CourseLoading'
import CourseFailPage from './pages/customer/course/CourseFailPage'
import CourseResultPage from './pages/customer/course/CourseResultPage'
import CourseDetailPage from './pages/customer/course/CourseDetailPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <OnboardingPage /> }, // 메인 온보딩 페이지로 바꾸기
      { path: 'select-language', element: <SelectLanguagePage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
      {
        path: 'onboarding/1',
        element: <OnboardingPage1 />,
      },
      {
        path: 'onboarding/2',
        element: <OnboardingPage2 />,
      },
      {
        path: 'onboarding/3',
        element: <OnboardingPage3 />,
      },
      {
        path: 'onboarding/4',
        element: <OnboardingPage4 />,
      },
      {
        path: 'onboarding/5',
        element: <OnboardingPage5 />,
      },
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
        path: '/menu/extract/loading',
        element: <MenuExtractLoadingPage />,
      },
      {
        path: '/menu/extract/success',
        element: <MenuExtractSuccessPage />,
      },
      {
        path: '/menu/extract/save',
        element: <MenuExtractSavePage />,
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
        path: '/menu/allergens/success',
        element: <MenuAllergensSuccessPage />,
      },
      {
        path: '/menu/allergens/apply',
        element: <MenuAllergensApplyPage />,
      },
      {
        path: '/menu/correct',
        element: <MenuCorrectPage />,
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
        path: 'store/mystore',
        element: <MyStorePage />,
      },
      {
        path: 'store/mystore/info',
        element: <MyStoreInfoPage />,
      },
      {
        path: 'store/mystore/edit',
        element: <MyStoreEditPage />,
      },
      {
        path: 'store/mystore/withdraw',
        element: <MyStoreWithdrawPage />,
      },
      {
        path: '/user/map',
        element: <MainMapPage />,
      },
      {
        path: '/user/map/store/:storeId',
        element: <MapStoresPage />,
      },
      {
        path: '/user/rates',
        element: <ExchangeRatePage />,
      },
      {
        path: '/user/overview',
        element: <OverviewPage />,
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
      {
        path: '/user/course',
        element: <CoursePage />,
      },
      {
        path: 'user/course/AI',
        element: <CourseAIPage />,
      },
      {
        path: 'user/course/AI/loading',
        element: <CourseLoading />,
      },
      {
        path: '/user/course/AI/fail',
        element: <CourseFailPage />,
      },
      {
        path: '/user/course/result',
        element: <CourseResultPage />,
      },
      {
        path: '/user/course/detail/:courseId',
        element: <CourseDetailPage />,
      },
    ],
  },
])

export default router
