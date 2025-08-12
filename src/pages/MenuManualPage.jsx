import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import Subtitle from '@/components/common/Subtitle'
import BottomNav from '@/components/common/BottomNav'
import MenuForm from '@/components/menuManagement/MenuForm'
// import icUploadPhoto from '@/assets/icon-upload-photo.svg'

const MenuManualPage = () => {
  return (
    <div>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true}></Header>
      <Title text={'메뉴 이름과 가격을 입력해주세요'}></Title>
      <Subtitle text={'‘메뉴 추가’ 버튼으로 메뉴를 추가해주세요'}></Subtitle>
      <MenuForm />
      <BottomNav />
    </div>
  )
}

export default MenuManualPage
