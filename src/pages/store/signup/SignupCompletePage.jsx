import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import checkOnImg from '@/assets/icon-circle-check-on.svg'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 145px;
`
const Context = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`

const Img = styled.img`
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`

const Text = styled.p`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const Button = styled.button`
  width: 82.56%;
  padding: 12.28px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  background-color: #fa6432;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`

const SignupCompletePage = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/store/home')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <ProgressBar currentStep={6} totalSteps={6} logoImg={smallDragon} />

      <Container>
        <Context>
          <Img src={checkOnImg} alt='완료' />
          <Text>
            회원가입이 완료되었어요.
            <br />
            가게 프로필을 등록해주세요!
          </Text>
        </Context>
        <Button onClick={handleSubmit}>확인</Button>
      </Container>
    </>
  )
}

export default SignupCompletePage
