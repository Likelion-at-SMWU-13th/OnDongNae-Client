import * as S from '@/styles/signup/StoreKeywordPage.styles'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SubTitle from '@/components/signup/SubTitle'
import TextAreaField from '@/components/signup/TextAreaField'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'

const StoreKeywordPage2 = () => {
  const navigate = useNavigate()
  const [recommendation, setRecommendation] = useState('')

  const handleSubmit = (action) => {
    if (action === 'skip') {
      navigate('/signup/loading')
      return
    }
    const value = recommendation.trim()
    if (!value) {
      alert('키워드를 입력하세요.')
      return
    }
    sessionStorage.setItem('recommendation', value)
    navigate('/signup/loading')
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
              <Title text={'외국인 방문객에게\n추천하고 싶은 것이 있나요?'} />
              {/* 작은 제목 */}
              <SubTitle text={'건너뛰기 해도 괜찮아요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <TextAreaField
                placeholder='옛날떡볶이와 순대세트'
                value={recommendation}
                onChange={setRecommendation}
              />
            </S.InputContainer>

            <SmallButtonContainerSkip handleSubmit={handleSubmit}></SmallButtonContainerSkip>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreKeywordPage2
