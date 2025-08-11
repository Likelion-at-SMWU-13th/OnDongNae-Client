import styled from 'styled-components'
import * as S from '@/styles/signup/SelectMarketPage.styles'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'

import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

const Main = styled.main`
  height: calc(var(--vh, 1vh) * 100); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`

const SelectMarketPage = () => {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  const markets = [
    { id: 1, name: '용산용문시장' },
    { id: 2, name: '이태원시장' },
    { id: 3, name: '후암재래시장' },
    { id: 4, name: '만리시장' },
    { id: 5, name: '해방촌 신흥시장' },
  ]

  // 다음 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedId) {
      alert('시장을 선택해주세요.')
      return
    }
    // 다음 페이지로
    navigate('/signup/store-address')
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <Main>
        <Scroll className='scrollable'>
          <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게 주소를 입력해주세요.'}></Title>

              <S.FormContainer>
                <SelectButton options={markets} value={selectedId} onChange={setSelectedId} />
                <S.ButtonContainer>
                  <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
                  <SmallOrangeButton type='submit' label='다음' onBtnClick={handleSubmit} />
                </S.ButtonContainer>
              </S.FormContainer>
            </S.TextContainer>
          </S.Container>
        </Scroll>
      </Main>
    </>
  )
}

export default SelectMarketPage
