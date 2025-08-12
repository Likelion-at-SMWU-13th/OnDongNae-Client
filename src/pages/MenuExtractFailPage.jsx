import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Warning from '@/assets/icon-warning.svg'
import SubTitle from '@/components/signup/SubTitle'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`
const WarningIcon = styled.img`
  margin: 164px 0 60px 0;
  width: 119px;
`
const Loading = styled(SubTitle)`
  font-size: 20px;
  font-weight: 500;
`
const MenuExtractFailPage = () => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div>
      <Header img={backIcon} title='메뉴 관리' showImg />
      <ComponentContainer>
        <WarningIcon src={Warning} alt='로딩중' />
        <Loading text='이미지를 인식하지 못했어요' />
        <Loading text='다른 사진으로 시도하거나 직접 입력해주세요' />
        <SmallOrangeButton type='submit' label='이전' onBtnClick={handleBack} />
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuExtractFailPage
