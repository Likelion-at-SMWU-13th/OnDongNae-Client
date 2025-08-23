import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'
import BottomNav from '@/components/common/BottomNav'

const MenuExtractLoadingPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => {
      const raw = state?.MenuData // 업로드 페이지에서 넘긴 res.data 전체
      const ok = raw?.success === true // success 확인
      const items = raw?.data?.items ?? [] // 실제 메뉴 배열
      const itemData = raw?.data
      if (!ok || items.length === 0) {
        navigate('/menu/extract/fail', { replace: true })
        return
      }
      const initialItems = items.map((it) => ({
        nameKo: it.name,
        priceKrw: it.priceKrw,
      }))

      navigate('/menu/extract/success', { state: { initialItems }, replace: true })
    }, 3000)

    return () => clearTimeout(t)
  }, [state, navigate])
  return (
    <div>
      <Header title='메뉴 관리' showImg={true} />
      <ComponentContainer>
        <SpinnerIcon src={Spinner} alt='로딩중' />
        <Loading text='메뉴를 추출하고 있어요' />
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuExtractLoadingPage

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
