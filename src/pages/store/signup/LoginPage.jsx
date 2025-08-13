import React, { useState } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import LoginForm from '@/components/login/LoginForm'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import LargeWhiteButton from '@/components/common/LargeWhiteButton'

const Logo = styled.p`
  margin: 56px 0 111px 0;
  text-align: center;
  align-items: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`

const ButtonContainer = styled.div`
  margin-top: 31px;
  display: flex;
  flex-direction: column;
  gap: 21px;
`

const Line = styled.div`
  width: 82.56%;
  height: 1px;
  background: rgba(0, 0, 0, 0.31);
  margin: 0 auto;
`

const Login = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    // 로그인 요청
    axios
      .post(
        'http://127.0.0.1:8000//auth/login',
        { id: id, password: password },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((response) => {
        const { success, message, data } = response.data

        if (!success) {
          // 로그인 실패
          alert(message)
          return
        }
        // 토큰은 response.data.data 내에 위치
        const { accessToken, refreshToken } = data

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        // axios 기본 헤더에 등록 -> 이후 요청은 자동으로 Bearer 토큰이 붙음
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 소상공인 홈 화면 이동 navigate 함수 추가
      })
      .catch((error) => {
        console.log(error)
        alert('로그인에 실패했습니다.')
      })
  }

  return (
    <>
      <Header img={backIcon} title={'로그인'} showImg={true} />

      <Logo>GORU GORU</Logo>
      <LoginForm id={id} password={password} onChangeId={setId} onChangePassword={setPassword} />
      <ButtonContainer>
        <LargeOrangeButton label='로그인' onBtnClick={handleSubmit} />
        <Line></Line>
        <LargeWhiteButton label='회원가입' onBtnClick={() => navigate('/signup/userinfo')} />
      </ButtonContainer>
    </>
  )
}

export default Login
