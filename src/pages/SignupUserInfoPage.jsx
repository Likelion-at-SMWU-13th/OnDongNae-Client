import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '@/components/common/PageContainer'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TextField from '@/components/signup/TextField'
import PhoneField from '@/components/signup/PhoneField'
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
  gap: 50px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin-top: 59px;
  margin-left: 14px;
`

const Signup = () => {
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const navigate = useNavigate()

  return (
    <PageContainer>
      <Header img={backIcon} title={'회원가입'} showImg={true}></Header>
      <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />
      <Container>
        <TextContainer>
          <Title text={'가입을 위한 정보를 입력해주세요.'}></Title>
          <FormContainer
            onSubmit={(e) => {
              e.preventDefault() // 새로고침 방지
              navigate('/signup/accountinfo', { state: { name, phoneNum } })
            }}
          >
            <TextField
              label='이름'
              placeholder='김멋사'
              value={name}
              onChange={setName}
            ></TextField>
            <PhoneField value={phoneNum} onChange={setPhoneNum} />
            <ButtonContainer>
              <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
              <SmallOrangeButton type='submit' label='다음' />
            </ButtonContainer>
          </FormContainer>
        </TextContainer>
      </Container>
    </PageContainer>
  )
}

export default Signup
