import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Warning from '@/assets/icon-warning.svg'
import SmallLightOrangeButton from '@/components/common/SmallLightOrangeButton'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
`
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
      <Header img={backIcon} title='메뉴 관리' showImg={true} />
      <ComponentContainer>
        <WarningIcon src={Warning} alt='로딩중' />
        <FailureMsg>{`인공지능 분석이 실패했어요
나중에 다시 시도해주세요`}</FailureMsg>
        <ButtonContainer>
          <SmallLightOrangeButton
            type='button'
            label='건너뛰기'
            onBtnClick={() => navigate('/menu/allergens/loading')}
          />
          <SmallOrangeButton type='button' label='다시 시도' onBtnClick={handleBack} />
        </ButtonContainer>
      </ComponentContainer>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensFailPage
