import styled from 'styled-components'
import * as S from '@/styles/signup/StorePhonePage.styles'
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

const Detail = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
`

const StorePhonePage = () => {
  const navigate = useNavigate()
  const [phoneNum, setPhoneNum] = useState('')

  const handleSubmit = () => {
    // 연동

    // 다음 페이지로 이동
    navigate('/signup/store-phone')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
      <S.Container>
        <S.TextContainer>
          <Title text={'가게 전화번호를  입력해주세요'}></Title>
          <Detail>전화번호가 없으면 건너뛰기를 눌러주세요.</Detail>
          <S.FormContainer>
            <InputField
              placeholder='02-0000-0000'
              value={phoneNum}
              onChange={setPhoneNum}
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

export default StorePhonePage
