import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import BottomNav from '@/components/common/BottomNav'

const MenuUploadPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/menu/upload', { state: {} })
  }

  return (
    <div>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <DoubleTitle
        title='메뉴판 사진을 올려주세요'
        subtitle='가게의 메뉴판이 잘 보이는 사진을 올려주세요'
      />
      <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
      <BottomNav />
    </div>
  )
}

export default MenuUploadPage
