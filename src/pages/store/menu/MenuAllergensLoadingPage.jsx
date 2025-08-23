import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import BottomNav from '@/components/common/BottomNav'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'

const MenuAllergensLoadingPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      const raw = state?.AllergensData
      const ok = raw?.success === true
      const results = raw?.data?.results ?? []

      if (!ok || results.length === 0) {
        navigate('/menu/allergens/fail', { replace: true })
        return
      }
      const initialResults = results.map((it) => ({
        menuId: it.menuId,
        nameKo: it.nameKo ?? it.name ?? '',
        allergiesCanonical: Array.isArray(it.allergiesCanonical) ? it.allergiesCanonical : [],
      }))

      navigate('/menu/allergens/success', { state: { initialResults }, replace: true })
    }, 600)

    return () => clearTimeout(t)
  }, [state, navigate])

  return (
    <div>
      <Header title='메뉴 관리' showImg={true} />
      <ComponentContainer>
        <SpinnerIcon src={Spinner} alt='로딩중' />
        <Loading text='인공지능이 음식 성분을 분석하고 있어요' />
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensLoadingPage

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
