import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuEdit from '@/components/menuManagement/MenuEdit'
import BottomNav from '@/components/common/BottomNav'

export default function MenuExtractSuccessPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const initialItems = state?.initialItems

  useEffect(() => {
    if (!Array.isArray(initialItems) || initialItems.length === 0) {
      navigate('/menu/extract/fail', { replace: true })
    }
  }, [initialItems, navigate])

  if (!Array.isArray(initialItems) || initialItems.length === 0) {
    return null
  }

  return (
    <>
      <Header title='메뉴 관리' showImg={true} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <DoubleTitle
            title='메뉴 추출이 끝났어요'
            subtitle='수정 버튼을 누르면 내용을 바꿀 수 있어요.'
          />
          <MenuEdit initialItems={initialItems} />
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 92px;
`
