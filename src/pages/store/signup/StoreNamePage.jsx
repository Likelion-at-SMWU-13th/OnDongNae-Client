import * as S from '@/styles/signup/StoreAddressPage.styles.js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import InputField from '@/components/signup/InputField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const StoreNamePage = () => {
  const navigate = useNavigate()
  const [storeName, setStoreName] = useState('')

  const handleSubmit = () => {
    if (!storeName) {
      alert('가게명을 입력해주세요.')
      return
    }
    sessionStorage.setItem('storeName', storeName)

    // 다음 페이지로 이동
    navigate('/signup/store-address')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll>
          <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게 이름을 입력해주세요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <InputField placeholder='고루고루' value={storeName} onChange={setStoreName} />
            </S.InputContainer>

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreNamePage
