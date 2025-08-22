import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDrag } from '@use-gesture/react'
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

  // useDgrag 훅
  const bind = useDrag(({ down, movement: [mx], velocity: [vx] }) => {
    if (!down && (mx < -40 || vx < -0.5)) {
      handleNext() // 다음 페이지로 이동
    }
  })

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main {...bind()}>
        <Title>{t('onboarding1.title')}</Title>
        <ContentContainer>
          <Content>{t('onboarding1.content1')}</Content>
          <Content>{t('onboarding1.content2')} </Content>
          <Content> {t('onboarding1.content3')}</Content>
        </ContentContainer>
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
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 13dvh;
  margin-bottom: 9dvh;
  padding-top: 6.4dvh;
  touch-action: pan-y;
`

const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5dvh;
  padding-top: 5.02dvh;
`

const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`
const Img = styled.img`
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 5.52dvh;
  width: 161.699px;
  height: 243px;
  flex-shrink: 0;
  aspect-ratio: 161.7/243;
`
