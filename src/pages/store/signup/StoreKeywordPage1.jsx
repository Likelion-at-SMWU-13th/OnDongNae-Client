import styled from 'styled-components'
import * as S from '@/styles/signup/StoreKeywordPage.styles'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SubTitle from '@/components/signup/SubTitle'
import TextAreaField from '@/components/signup/TextAreaField'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'

const StoreKeywordPage1 = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [strength, setStrength] = useState('')

  // 다음 또는 건너뛰기 클릭
  const handleSubmit = (e) => {
    if (e === 'skip') {
      navigate('/signup/store-keyword2', { state: { ...state } })
      return
    }
    navigate('/signup/store-keyword2', { state: { ...state, strength } })
  }

  return (
    <>
      {/* 상단 헤더*/}
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      {/* 스크롤 가능 영역*/}
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게만의 특별한 매력이나 장점을\n알려주세요.'} />
              {/* 작은 제목 */}
              <SubTitle text={'건너뛰기 해도 괜찮아요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <TextAreaField
                placeholder='직접 양념하고 숙성한 떡볶이 소스'
                value={strength}
                onChange={setStrength}
              />
            </S.InputContainer>

            <SmallButtonContainerSkip handleSubmit={handleSubmit}></SmallButtonContainerSkip>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreKeywordPage1
