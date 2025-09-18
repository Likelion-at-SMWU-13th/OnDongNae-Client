import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const ProtectedRoute = () => {
  // 로그인 상태 가져오기
  const { isLoggedIn } = useAuth()

  // isLoggedIn이 true면, 페이지 보여주기
  if (isLoggedIn) {
    return <Outlet />
  } else {
    // isLoggedIn이 false면, 로그인 페이지로 강제 이동
    // 로그인 후에, 다시 로그인 페이지로 돌아오지 않게 replace 옵션 주기
    alert('로그인이 필요한 페이지입니다.')
    return <Navigate to='/login' replace />
  }
}

export default ProtectedRoute
