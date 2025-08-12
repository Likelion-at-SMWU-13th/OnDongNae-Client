import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import Subtitle from '@/components/common/Subtitle'
import BottomNav from '@/components/common/BottomNav'
import MenuForm from '@/components/menuManagement/MenuForm'
// import icUploadPhoto from '@/assets/icon-upload-photo.svg'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 38px 0px 0px 30px;
`
const MenuManualPage = () => {
  return (
    <div>
      <Header img={backIcon} title='메뉴 관리' showImg={true} />
      <TitleContainer>
        <Title text={'메뉴 이름과 가격을 입력해주세요'}></Title>

        <Subtitle text={'‘메뉴 추가’ 버튼으로 메뉴를 추가해주세요'}></Subtitle>
      </TitleContainer>

      <MenuForm />
      <BottomNav />
    </div>
  )
}

export default MenuManualPage
