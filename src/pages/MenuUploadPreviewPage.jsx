import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import BottomNav from '@/components/common/BottomNav'

import Image from '@/assets/image.png'

import closeIcon from '@/assets/button-close.svg'

const ImageContainer = styled.div`
  position: relative;
  margin: 50px auto;
  width: 296px;
  height: 204px;
  background: #f2f2f2;
  overflow: hidden;
`
const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`
const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 25px;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
`

export default function MenuUploadPreviewPage() {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/menu/extract/loading')
  }

  return (
    <div>
      <Header img={backIcon} title='메뉴 관리' showImg />
      <DoubleTitle
        title='메뉴판 사진을 올려주세요'
        subtitle='가게의 메뉴판이 잘 보이는 사진을 올려주세요'
      />

      <ImageContainer>
        <MenuImage src={Image} alt='메뉴판사진' />
        <CloseBtn onClick={() => navigate('/menu/upload')}>
          <img src={closeIcon} alt='이미지 삭제' />
        </CloseBtn>
      </ImageContainer>

      <SmallButtonContainer handleSubmit={handleSubmit} />
      <BottomNav />
    </div>
  )
}
