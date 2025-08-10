import styled from 'styled-components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '@/components/common/PageContainer'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SmallButton from '@/components/common/SmallButton'
import TextField from '@/components/signup/TextField'
import PhoneField from '@/components/signup/PhoneField'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 109px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 0 30px;
  gap: 60px;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin: 0 auto;
`

const Signup = () => {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <Header img={backIcon} title={'회원가입'} showImg={true}></Header>
      <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />
      <Container>
        <TextContainer>
          <Title text={'가입을 위한 정보를 입력해주세요.'}></Title>

          <FormContainer>
            <TextField></TextField>
            <PhoneField></PhoneField>
          </FormContainer>
        </TextContainer>
        <ButtonContainer>
          <SmallButton label='이전' bgcolor='#D6D6D6' onBtnClick={() => navigate(-1)} />
          <SmallButton label='다음' onBtnClick={() => navigate()} />
        </ButtonContainer>
      </Container>
    </PageContainer>
  )
}

export default Signup
