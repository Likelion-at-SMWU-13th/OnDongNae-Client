import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'

import koru4 from '@/assets/img-koru4.svg'

const OnboardingPage5 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(4)
  const totalSteps = 5

  const nextStep = () => setStep((prev) => (prev + 1) % totalSteps)
  const handleSkip = () => {
    navigate('/user/map')
  }

  const handleNext = () => {
    navigate('/user/map')
  }

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main>
        <Title>{t('onboarding5.content1')}</Title>
        <Title>{t('onboarding5.content2')}</Title>
        <Title>
          {t('onboarding5.content3')}
          <Highlight>GoruGoru!</Highlight>
        </Title>

        <Img src={koru4} alt='logo' />
      </Main>
      <Footer currentStep={step} totalSteps={totalSteps} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage5

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
  font-weight: 400;
`
const Highlight = styled.span`
  color: #fa6432;
  font-size: 1.25rem;
  font-weight: 700;
`
const Img = styled.img`
  display: block;
  margin: 0 auto;
  padding-top: 6.28dvh;
  width: 207px;
  height: 311px;
`
