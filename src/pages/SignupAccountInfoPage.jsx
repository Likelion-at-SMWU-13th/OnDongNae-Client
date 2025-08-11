import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
//import PageContainer from '@/components/common/PageContainer'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TextField from '@/components/signup/TextField'
import PasswordField from '@/components/signup/PasswordField'

import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/smallGrayButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 109px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 44px 0 30px;
  gap: 60px;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin-top: 12px;
  margin-left: 14px;
`

const SignupAccountInfo = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { name, phoneNum } = state || {} // 앞에서 넘어온 사용자이름, 폰번호

  const [loginId, setloginId] = useState('')
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // 회원가입
    axios
      .post(
        'http://127.0.0.1:8000/auth/signup/user',
        { name, phoneNum, loginId, password1: pw1, password2: pw2 },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((response) => {
        const { success, message, userId } = response.data || {}

        if (!success) {
          alert(message)
        }
        if (!userId) {
          alert(message)
        }

        // 토큰 저장..?

        // 다음 회원가입 단계로 (userId 포함해서 이동해야 하는 것?)
        navigate('signup/terms')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />

      <Container>
        <TextContainer>
          <Title text={'가입을 위한 정보를 입력해주세요.'}></Title>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              label='아이디'
              placeholder='영문/숫자, 4~12자'
              value={loginId}
              onChange={setloginId}
            ></TextField>
            <PasswordField
              value1={pw1}
              value2={pw2}
              onChange1={setPw1}
              onChange2={setPw2}
            ></PasswordField>

            <ButtonContainer>
              <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
              <SmallOrangeButton
                type='submit'
                label='다음'
                onBtnClick={() => navigate('/signup/terms')} // 확인용 -> 연동 후 삭제
              />
            </ButtonContainer>
          </FormContainer>
        </TextContainer>
      </Container>
    </>
  )
}
export default SignupAccountInfo
