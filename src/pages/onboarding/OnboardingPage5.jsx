import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDrag } from '@use-gesture/react'
import styled, { keyframes } from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'
import koru4 from '@/assets/img-koru4.svg'

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

const OnboardingPage5 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSkip = () => {
    navigate('/user/map')
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleNext = () => {
    navigate('/user/map')
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
        <Title>{t('onboarding5.content1')}</Title>
        <Title>{t('onboarding5.content2')}</Title>
        <Title>
          {t('onboarding5.content3')}
          <Highlight>GoruGoru!</Highlight>
        </Title>

        <Img src={koru4} alt='logo' />
      </Main>
      <Footer currentStep={4} totalSteps={5} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage5

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
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
`
const Highlight = styled.span`
  color: #fa6432;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`
const Img = styled.img.attrs({
  loading: 'lazy',
})`
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 13.44dvh;
  width: 207px;
  height: 311px;
  flex-shrink: 0;
  aspect-ratio: 207/311;
`
