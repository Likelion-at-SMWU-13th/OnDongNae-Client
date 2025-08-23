import React, { useState } from 'react'
import * as S from '@/styles/signup/StoreKeywordPage.styles'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SubTitle from '@/components/signup/SubTitle'
import TextAreaField from '@/components/signup/TextAreaField'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'

const StoreKeywordPage1 = () => {
  const navigate = useNavigate()
  const [strength, setStrength] = useState('')

  // 다음 또는 건너뛰기 클릭
  const handleSubmit = (action) => {
    if (action === 'skip') {
      navigate('/signup/store-keyword2')
      return
    }
    const value = strength.trim()
    if (!value) {
      alert('키워드를 입력하세요.')
      return
    }
    sessionStorage.setItem('strength', value)
    navigate('/signup/store-keyword2')
  }

  return (
    <>
      <Header title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게만의 특별한 매력이나 장점을\n알려주세요.'} />
              <SubTitle text={'건너뛰기 해도 괜찮아요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <TextAreaField
                placeholder='직접 양념하고 숙성한 떡볶이 소스'
                value={strength}
                onChange={setStrength}
              />
            </S.InputContainer>
            <SmallButtonContainerSkip handleSubmit={handleSubmit} />
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreKeywordPage1
