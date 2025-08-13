import styled from 'styled-components'
import * as S from '@/styles/signup/StoreAddressPage.styles.js'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import InputField from '@/components/signup/InputField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const StoreAddressPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [address, setAddress] = useState('')

  const handleSubmit = () => {
    if (!address) {
      alert('주소를 입력해주세요.')
      return
    }
    // 연동

    // 다음 페이지로 이동
    navigate('/signup/store-phone', { state: { ...state, address } })
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
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

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreAddressPage
