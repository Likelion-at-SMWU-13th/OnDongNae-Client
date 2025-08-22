import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'

import koru1 from '@/assets/img-koru1.svg'

const OnboardingPage1 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const totalSteps = 5

  const nextStep = () => setStep((prev) => (prev + 1) % totalSteps)
  const handleSkip = () => {
    navigate('/user/map')
  }

  const handleNext = () => {
    navigate('/onboarding/2')
  }

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main>
        <Title>{t('onboarding1.title')}</Title>
        <Content>
          {t('onboarding1.content1')} <br />
          {t('onboarding1.content2')}
        </Content>
        <Img src={koru1} alt='logo' />
      </Main>
      <Footer currentStep={step} totalSteps={totalSteps} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage1

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`

const Main = styled.div`
  flex: 1;
  margin-top: 10dvh;
  margin-bottom: 16dvh;
  padding-top: 8.29dvh;
`

const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
`

const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 30px;
  padding-top: 2.51dvh;
`
const Img = styled.img`
  display: block;
  margin: 0 auto;
  padding-top: 6.28dvh;

  width: 179px;
  height: 269px;
`
