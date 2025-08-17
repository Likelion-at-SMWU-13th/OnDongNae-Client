import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'

import BtnUpload from '@/assets/icon-upload-photo.svg'

const Img = styled.img`
  margin-top: 90px;
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`

const MenuUploadPage = () => {
  return (
    <div>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <DoubleTitle
        title='메뉴판 사진을 올려주세요'
        subtitle='가게의 메뉴판이 잘 보이는 사진을 올려주세요'
      />
      <ImgContainer>
        <Img src={BtnUpload} alt='사진 업로드' style={{ cursor: 'pointer' }} />
      </ImgContainer>
      <BottomNav />
    </div>
  )
}

export default MenuUploadPage
