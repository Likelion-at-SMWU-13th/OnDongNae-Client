import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDrag } from '@use-gesture/react'
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

  const handlePrev = () => {
    navigate(-1)
  }

  // useDgrag 훅
  const bind = useDrag(({ down, movement: [mx], velocity: [vx] }) => {
    if (!down) {
      // 왼쪽으로 스와이프
      if (mx < -50 || vx < -0.5) {
        handleNext()
      }
      // 오른쪽으로 스와이프
      else if (mx > 50 || vx > 0.5) {
        handlePrev()
      }
    }
  })

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main {...bind()}>
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
  gap: 1.88dvh;
  padding-top: 5.02dvh;
`

const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  gap: 0.5dvh;
`
const Img = styled.img`
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 5.52dvh;
  height: 30.52dvh;
  flex-shrink: 0;
  aspect-ratio: 2/3;
`
