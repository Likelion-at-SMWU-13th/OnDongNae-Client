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
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 13dvh;
  margin-bottom: 9dvh;
  padding-top: 6.4dvh;
`

const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`
const Highlight = styled.span`
  color: #fa6432;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`
const Img = styled.img`
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 13.44dvh;
  width: 207px;
  height: 311px;
  flex-shrink: 0;
  aspect-ratio: 207/311;
`
