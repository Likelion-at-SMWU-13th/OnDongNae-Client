import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import SubTitle from '@/components/signup/SubTitle'
import Check from '@/assets/icon-circle-check-on.svg'
import BottomNav from '@/components/common/BottomNav'

const MenuAllergensApplyPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='scrollable'>
      <Header title='메뉴 관리' showImg={true} />
      <C.Main>
        <C.Scroll>
          <ComponentContainer>
            <CheckIcon src={Check} alt='로딩완료' />
            <LoadingSuccess
              text={`알레르기 분석이 적용되었어요
인공지능 분석 결과는 참고용입니다.`}
            />
          </ComponentContainer>
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensApplyPage

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`
const CheckIcon = styled.img`
  margin: 164px 0 47px 0;
  width: 96px;
`
const LoadingSuccess = styled(SubTitle)`
  font-size: 20px;
  font-weight: 500;
  white-space: pre-line;
`
