import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDrag } from '@use-gesture/react'
import usePreloadImages from '@/hooks/usePreloadImages'
import styled, { keyframes } from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'
import koru1 from '@/assets/img-koru1.svg'
import koru2 from '@/assets/img-koru2.svg'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const OnboardingPage1 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  usePreloadImages([koru2])

  const handleSkip = () => {
    navigate('/user/map')
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleNext = () => {
    navigate('/onboarding/2')
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
        <Title>{t('onboarding1.title')}</Title>
        <ContentContainer>
          <Content>{t('onboarding1.content1')}</Content>
          <Content>{t('onboarding1.content2')} </Content>
          <Content> {t('onboarding1.content3')}</Content>
        </ContentContainer>
        <Img src={koru1} alt='logo' loading='eager' decoding='async' fetchpriority='high' />
      </Main>
      <Footer currentStep={0} totalSteps={5} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage1

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  animation: ${fadeIn} 0.5s ease-out;
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
  font-size: 1.25rem;
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
  font-size: 1rem;
  font-weight: 400;
`
const Img = styled.img`
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 5.52dvh;
  height: 30.52dvh;

  flex-shrink: 0;
`
