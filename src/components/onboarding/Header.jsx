import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Logo from '@/components/onboarding/Logo'

const Header = ({ onSkip }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <SkipWrapper>
        <Button onClick={onSkip}>{t('button.skip')}</Button>
      </SkipWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </Container>
  )
}

export default Header

const Container = styled.div`
  width: min(100vw, 390px);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  display: flex;
  flex-direction: column;
  background: white;
  height: 11.76dvh;
  margin-top: 1.24dvh;
`
const SkipWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`

const Button = styled.button`
  display: inline;
  width: auto;
  height: auto;
  color: #fa6432;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 35px;
  border: none;
  background: none;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`
