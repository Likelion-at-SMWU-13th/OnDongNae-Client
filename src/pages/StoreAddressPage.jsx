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
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

const StoreAddressPage = () => {
  const [address, setAddress] = useState('')

  const navigate = useNavigate()

  const handleSubmit = () => {
    // 연동

    // 다음 페이지로 이동
    navigate('')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
      <S.Container>
        <S.TextContainer>
          <Title text={'가게 주소를 입력해주세요.'}></Title>
          <S.FormContainer>
            <InputField
              placeholder='서울특별시 용산구 멋사로 08-03'
              value={address}
              onChange={setAddress}
            ></InputField>
            <S.ButtonContainer>
              <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
              <SmallOrangeButton type='submit' label='다음' onBtnClick={handleSubmit} />
            </S.ButtonContainer>
          </S.FormContainer>
        </S.TextContainer>
      </S.Container>
    </>
  )
}

export default StoreAddressPage
