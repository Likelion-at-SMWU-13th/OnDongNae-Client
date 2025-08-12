import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
// import PageContainer from '@/components/common/PageContainer'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import RegisterOptions from '@/components/menuManagement/RegisterOptions'

const RegisterMenuSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 38px 30px 50px 30px;
  gap: 17px;
`
function MenuPage() {
  const navigate = useNavigate()

  return (
    <>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true}></Header>
      <RegisterMenuSection>
        <Title text={'메뉴판을 등록해주세요'}></Title>
        <RegisterOptions
          onUploadClick={() => navigate('/menu/upload-photo')} // 메뉴판 사진 올리기
          onManualClick={() => navigate('/menu/manual')} // 직접 입력하기
        />
      </RegisterMenuSection>
    </>
  )
}

export default MenuPage
