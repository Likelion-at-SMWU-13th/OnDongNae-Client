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
import SubTitle from '@/components/signup/SubTitle'
import PhoneField from '@/components/signup/PhoneField'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'

const StorePhonePage = () => {
  const navigate = useNavigate()
  const [phoneNum, setPhoneNum] = useState('')

  const handleSubmit = () => {
    // 연동

    // 다음 페이지로 이동
    navigate('/signup/store-category-main')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll>
          <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게 전화번호를 입력해주세요.'} />
              <SubTitle text={'전화번호가 없으면 건너뛰기를 눌러주세요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <PhoneField placeholder='02-000-0000' value={phoneNum} onChange={setPhoneNum} />
            </S.InputContainer>

            <SmallButtonContainerSkip handleSubmit={handleSubmit}></SmallButtonContainerSkip>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StorePhonePage
