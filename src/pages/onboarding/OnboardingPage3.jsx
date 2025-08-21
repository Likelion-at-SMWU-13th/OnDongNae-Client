import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'

import koru2 from '@/assets/img-koru2.svg'

const OnboardingPage3 = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [step, setStep] = useState(2)
  const totalSteps = 5

  const nextStep = () => setStep((prev) => (prev + 1) % totalSteps)
  const handleSkip = () => {
    navigate('/user/map')
  }

  const handleNext = () => {
    navigate('/onboarding/4')
  }

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main>
        <ContentContainer>
          <Content>
            {t('onboarding3.content1')} <Highlight>GoruGoru</Highlight>,
            <br />
            {t('onboarding3.content2')}
            <br />
            {t('onboarding3.content3')} <Highlight>‘고루고루’</Highlight>,
            <br />
            {t('onboarding3.content4')}
            <br />
            {t('onboarding3.content5')}
          </Content>
          <Content>
            {t('onboarding3.content6')}
            <br />
            {t('onboarding3.content7')}
          </Content>
        </ContentContainer>
        <Img src={koru2} alt='logo' />
      </Main>
      <Footer currentStep={step} totalSteps={totalSteps} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage3

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.77dvh;
`

const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 30px;
`

const Highlight = styled.span`
  color: #fa6432;
  font-size: 1rem;
  font-weight: 700;
  line-height: 30px;
`
const Img = styled.img`
  display: block;
  margin: 0 auto;
  padding-top: 2.51dvh;

  height: 30.52dvh;
`
