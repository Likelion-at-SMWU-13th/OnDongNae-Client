import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDrag } from '@use-gesture/react'
import styled, { keyframes } from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'
import koru3 from '@/assets/img-koru3.svg'

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

const OnboardingPage4 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSkip = () => {
    navigate('/user/map')
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleNext = () => {
    navigate('/onboarding/5')
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
        <Title>{t('onboarding4.content1')}</Title>
        <List>
          <Item>{t('onboarding4.content2')}</Item>
          <Item>{t('onboarding4.content3')}</Item>
          <Item>{t('onboarding4.content4')}</Item>
          <TwoItem>
            {t('onboarding4.content5')}
            <br />
            {t('onboarding4.content6')}
          </TwoItem>
        </List>
      </Main>
      <Footer currentStep={3} totalSteps={5} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage4

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  animation: ${fadeIn} 0.5s ease-out;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const List = styled.ul`
  list-style: none;
  padding-top: 7.91dvh;
  display: flex;
  flex-direction: column;
  gap: 4.64dvh;
`

const Item = styled.li`
  color: #000;
  text-align: left;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &::before {
    content: url(${koru3});
    display: inline-block; /* content 속성이 잘 적용되도록 */
    margin-right: 14px; /* 아이콘과 텍스트 사이 간격 */
  }
`
const TwoItem = styled(Item)`
  line-height: 25px;
`
