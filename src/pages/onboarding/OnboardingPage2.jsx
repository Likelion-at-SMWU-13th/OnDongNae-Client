import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'

import koru2 from '@/assets/img-koru2.svg'

const OnboardingPage2 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const nextStep = () => setStep((prev) => (prev + 1) % totalSteps)
  const handleSkip = () => {
    navigate('/user/map')
  }

  const handleNext = () => {
    navigate('/onboarding/3')
  }

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main>
        <Title>{t('onboarding2.title')}</Title>
        <ContentContainer>
          <Content>
            {t('onboarding2.content1')}
            <br />
            {t('onboarding2.content2')}
          </Content>
          <Content>
            {t('onboarding2.content3')}
            <br />
            {t('onboarding2.content4')}
          </Content>
          <Content>
            {t('onboarding2.content5')}
            <br />
            {t('onboarding2.content6')}
          </Content>
        </ContentContainer>
        <Img src={koru2} alt='logo' />
      </Main>
      <Footer currentStep={step} totalSteps={totalSteps} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage2

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`

const Main = styled.div`
  flex: 1;
  margin-top: 10dvh;
  margin-bottom: 16dvh;
  padding-top: 5.02dvh;
`

const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62dvh;
  padding-top: 2.51dvh;
`

const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
`
const Img = styled.img`
  display: block;
  margin: 0 auto;
  padding-top: 3.2dvh;

  height: 30.52dvh;
`
