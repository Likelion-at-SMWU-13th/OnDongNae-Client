import React, { useState } from 'react'
import * as S from '@/styles/signup/SignupAccountInfoPage.styles'
import * as C from '@/styles/common/SignupScroll.styles'
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
  const isLetterPlusNumber = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(str) // 비밀번호 확인
  const apiUrl = import.meta.env.VITE_API_URL
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loginId) {
      alert('아이디를 입력해 주세요.')
      return
    }
    if (!pw1 || !pw2) {
      alert('비밀번호를 입력해 주세요.')
      return
    }
    if (pw1.length < 4) {
      alert('비밀번호는 4자리 이상으로 설정해주세요.')
      return
    }
    if (pw1 !== pw2) {
      alert('비밀번호가 일치하지 않아요.')
      return
    }
    if (!isLetterPlusNumber(pw1)) {
      alert('영어와 숫자를 조합해서 비밀번호를 입력해주세요.')
    }
    // 연동
    axios
      .post(
        `${apiUrl}/auth/signup/user`,
        { name: name, phoneNum: phoneNum, loginId: loginId, password1: pw1, password2: pw2 },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        const memberId = res.data.data
        sessionStorage.setItem('memberId', JSON.stringify(res.data.data))
        localStorage.setItem('accessToken', res.data.tokens.accessToken)
        localStorage.setItem('refreshToken', res.data.tokens.refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.tokens.accessToken}`
        navigate('/signup/terms')
      })
      .catch((err) => {
        console.log(err)
        navigate('/signup/terms', { state: { prevStep: 2 } })
      })
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <ProgressBar currentStep={1} totalSteps={6} logoImg={smallDragon} />
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
        </C.Scroll>
      </C.Main>
    </>
  )
}
export default SignupAccountInfo
