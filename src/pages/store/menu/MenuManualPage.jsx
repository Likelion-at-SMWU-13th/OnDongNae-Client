import React from 'react'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import Header from '@/components/common/Header'
import Title from '@/components/common/Title'
import Subtitle from '@/components/common/Subtitle'
import BottomNav from '@/components/common/BottomNav'
import MenuForm from '@/components/menuManagement/MenuForm'

const MenuManualPage = () => {
  return (
    <div className='scrollable'>
      <Header title='메뉴 관리' showImg={true} />
      <C.Main>
        <C.Scroll>
          <TitleContainer>
            <Title text={'메뉴 이름과 가격을 입력해주세요'}></Title>
            <Subtitle text={'‘메뉴 추가’ 버튼으로 메뉴를 추가해주세요'}></Subtitle>
          </TitleContainer>
          <MenuForm />
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </div>
  )
}

export default MenuManualPage

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 38px 0px 0px 30px;
`
