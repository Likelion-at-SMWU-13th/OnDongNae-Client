import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import Header from '@/components/onboarding/Header'
import Footer from '@/components/onboarding/Footer'

import koru3 from '@/assets/img-koru3.svg'

const OnboardingPage4 = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [step, setStep] = useState(3)
  const totalSteps = 5

  const nextStep = () => setStep((prev) => (prev + 1) % totalSteps)
  const handleSkip = () => {
    navigate('/user/map')
  }

  const handleNext = () => {
    navigate('/onboarding/5')
  }

  return (
    <Container>
      <Header onSkip={handleSkip} />
      {/* 메인 콘텐츠 영역 */}
      <Main>
        <Title>{t('onboarding4.content1')}</Title>
        <List>
          <Item>
            {t('onboarding4.content2')}
            <br />
            {t('onboarding4.content3')}
          </Item>
          <Item>{t('onboarding4.content4')}</Item>
          <Item>
            {t('onboarding4.content5')}
            <br />
            {t('onboarding4.content6')}
          </Item>
          <Item>{t('onboarding4.content7')}</Item>
        </List>
      </Main>
      <Footer currentStep={step} totalSteps={totalSteps} onNext={handleNext} />
    </Container>
  )
}

export default OnboardingPage4

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

const List = styled.ul`
  list-style: none;
  padding-top: 7.16dvh;
  display: flex;
  flex-direction: column;
  gap: 5.02dvh;
`

const Item = styled.li`
  color: #000;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: url(${koru3});
    display: inline-block; /* content 속성이 잘 적용되도록 */
    margin-right: 10px; /* 아이콘과 텍스트 사이 간격 */
  }
`
