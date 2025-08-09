import React from 'react'
import styled from 'styled-components'
import PageContainer from '@/components/common/PageContainer'
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
  return (
    <PageContainer>
      <Header img={backIcon} title={'로그인'} showImg={true}></Header>
      <Logo>GoruGoru</Logo>
      <LoginForm></LoginForm>
      <ButtonContainer>
        <LargeOrangeButton label='로그인' />
        <Line></Line>
        <LargeWhiteButton label='회원가입' />
      </ButtonContainer>
    </PageContainer>
  )
}

export default Login
