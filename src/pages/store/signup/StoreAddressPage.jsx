import * as S from '@/styles/signup/StoreAddressPage.styles.js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import InputField from '@/components/signup/InputField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const StoreAddressPage = () => {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')

  const handleSubmit = () => {
    if (!address) {
      alert('주소를 입력해주세요.')
      return
    }
    sessionStorage.setItem('address', address)

    navigate('/signup/store-phone')
  }
  return (
    <>
      <Header title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll>
          <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게 주소를 입력해주세요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <InputField
                placeholder='서울특별시 용산구 멋사로 08-03'
                value={address}
                onChange={setAddress}
              />
            </S.InputContainer>
            <SmallButtonContainer handleSubmit={handleSubmit} />
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreAddressPage
