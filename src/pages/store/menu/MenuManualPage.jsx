import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import Subtitle from '@/components/common/Subtitle'
import BottomNav from '@/components/common/BottomNav'
import MenuForm from '@/components/menuManagement/MenuForm'
// import icUploadPhoto from '@/assets/icon-upload-photo.svg'
export const Main = styled.main`
  height: calc(100dvh - 155px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`
export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 38px 0px 0px 30px;
`
const MenuManualPage = () => {
  return (
    <div className='scrollable'>
      <Header img={backIcon} title='메뉴 관리' showImg={true} />
      <Main>
        <Scroll>
          <TitleContainer>
            <Title text={'메뉴 이름과 가격을 입력해주세요'}></Title>

            <Subtitle text={'‘메뉴 추가’ 버튼으로 메뉴를 추가해주세요'}></Subtitle>
          </TitleContainer>
          <MenuForm />
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuManualPage
