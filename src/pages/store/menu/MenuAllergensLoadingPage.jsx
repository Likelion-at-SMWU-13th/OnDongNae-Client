import React from 'react'
import styled from 'styled-components'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'

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
