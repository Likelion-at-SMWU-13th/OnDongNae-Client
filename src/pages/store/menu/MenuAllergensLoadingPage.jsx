import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'
import { useLocation, useNavigate } from 'react-router-dom'

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`
const SpinnerIcon = styled.img`
  margin: 164px 0 60px 0;
  width: 119px;
`
const Loading = styled(SubTitle)`
  font-size: 20px;
  font-weight: 500;
`

const MenuAllergensLoadingPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      const raw = state?.AllergensData // 업로드 페이지에서 넘긴 res.data 전체
      const ok = raw?.success === true
      const results = raw?.data?.results ?? []

      if (!ok || results.length === 0) {
        navigate('/menu/allergens/fail', { replace: true })
        return
      }

      // ✅ 화면/저장에 쓸 초기 값 (누락 대비 기본값 처리)
      const initialResults = results.map((it) => ({
        menuId: it.menuId,
        nameKo: it.nameKo ?? it.name ?? '', // 서버가 nameKo 또는 name 주는 경우 대비
        allergiesCanonical: Array.isArray(it.allergiesCanonical) ? it.allergiesCanonical : [],
      }))

      navigate('/menu/allergens/success', { state: { initialResults }, replace: true })
    }, 600)

    return () => clearTimeout(t)
  }, [state, navigate])

  return (
    <div>
      <Header img={backIcon} title='메뉴 관리' showImg />
      <ComponentContainer>
        <SpinnerIcon src={Spinner} alt='로딩중' />
        <Loading text='인공지능이 음식 성분을 분석하고 있어요' />
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensLoadingPage
