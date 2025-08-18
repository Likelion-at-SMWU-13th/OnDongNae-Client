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
  const apiUrl = import.meta.env.VITE_API_URL
  const handleSubmit = (e) => {
    if (!loginId) {
      alert('아이디를 입력해 주세요.')
      return
    }
    if (!pw1 || !pw2) {
      alert('비밀번호를 입력해 주세요.')
      return
    }
    if (pw1 !== pw2) {
      alert('비밀번호가 일치하지 않아요.')

      return
    }
    e.preventDefault()
    // 연동
    axios
      .post(
        `${apiUrl}/auth/signup/user`,
        { name: name, phoneNum: phoneNum, loginId: loginId, password1: pw1, password2: pw2 },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        // 응답에서 반환한 userId를 가게 등록 API에서 ResponseBody에 넣어주기
        const memberId = res?.data?.data?.memberId
        // 세션에 userId 저장
        sessionStorage.setItem('memberId', String(memberId))

        // 이 코드는 회원가입이 완료된 페이지에 넣어야 하는 것?
        localStorage.setItem('accessToken', res.data.tokens.accessToken)
        localStorage.setItem('refreshToken', res.data.tokens.refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.tokens.accessToken}`

        navigate('/signup/terms')
      })
      .catch((err) => {
        console.log(err)
        // 연동 후 삭제
        navigate('/signup/terms', { state: { prevStep: 2 } })
      })
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
