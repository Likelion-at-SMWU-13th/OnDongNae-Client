import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Warning from '@/assets/icon-warning.svg'
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
const FailureMsg = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 50px;
  white-space: pre-line; /* \n 줄바꿈 표시 */
`

const MenuAllergensFailPage = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate(-1)
  return (
    <div>
      <Header img={backIcon} title='메뉴 관리' showImg />
      <ComponentContainer>
        <WarningIcon src={Warning} alt='로딩중' />
        <FailureMsg>{`인공지능 분석이 실패했어요
나중에 다시 시도해주세요`}</FailureMsg>
        <SmallOrangeButton type='' label='건너뛰기' onBtnClick={handleBack} />
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensFailPage
