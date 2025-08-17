import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
// import PageContainer from '@/components/common/PageContainer'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import RegisterOptions from '@/components/menuManagement/RegisterOptions'
import BottomNav from '@/components/common/BottomNav'
import RegisteredMenu from '@/components/menuManagement/RegisteredMenu'
const RegisterMenuSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 38px 30px 50px 30px;
  gap: 17px;
`
const MenuList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 0pc 30px;
  gap: 35px;
`
function MenuPage() {
  const navigate = useNavigate()

  return (
    <>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true}></Header>
      <RegisterMenuSection>
        <Title text={'메뉴판을 등록해주세요'}></Title>
        <RegisterOptions
          onUploadClick={() => navigate('/menu/upload')} // 메뉴판 사진 올리기
          onManualClick={() => navigate('/menu/manual')} // 직접 입력하기
        />
      </RegisterMenuSection>
      <MenuList>
        <Title text={'등록된 메뉴'}></Title>
        <RegisteredMenu />
      </MenuList>
      <BottomNav />
    </>
  )
}

export default MenuPage
