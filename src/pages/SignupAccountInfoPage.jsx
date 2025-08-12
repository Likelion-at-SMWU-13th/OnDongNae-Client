import styled from 'styled-components'
import * as S from '@/styles/signup/SignupAccountInfoPage.styles'

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TextField from '@/components/signup/TextField'
import PasswordField from '@/components/signup/PasswordField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const SignupAccountInfo = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { name, phoneNum } = state || {} // 앞에서 넘어온 사용자이름, 폰번호

  const [loginId, setloginId] = useState('')
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/signup/terms')
    // 연동
    // axios
    //   .post(
    //     'http://127.0.0.1:8000/auth/signup/user',
    //     { name, phoneNum, loginId, password1: pw1, password2: pw2 },
    //     { headers: { 'Content-Type': 'application/json' } },
    //   )
    //   .then((response) => {
    //     const { success, message, userId } = response.data || {}

    //     if (!success) {
    //       alert(message)
    //     }
    //     if (!userId) {
    //       alert(message)
    //     }

    //     // 토큰 저장..?

    //     // 다음 회원가입 단계로 (userId 포함해서 이동해야 하는 것?)
    //     navigate('signup/terms')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />

          <S.Container>
            <S.TextContainer>
              <Title text={'가입을 위한 정보를 입력해주세요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <TextField
                label='아이디'
                placeholder='영문/숫자, 4~12자'
                value={loginId}
                onChange={setloginId}
              />
              <PasswordField value1={pw1} value2={pw2} onChange1={setPw1} onChange2={setPw2} />
            </S.InputContainer>

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}
export default SignupAccountInfo
