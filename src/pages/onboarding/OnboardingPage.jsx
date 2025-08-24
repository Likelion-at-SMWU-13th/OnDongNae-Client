import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import onboarding from '@/assets/logo-onboardong.png'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setFading(true) // 페이드아웃 시작
      const navTimer = setTimeout(() => {
        navigate('/select-language')
      }, 1000)
      return () => clearTimeout(navTimer)
    }, 3000)

    return () => clearTimeout(showTimer)
  }, [navigate])

  return (
    <Content $fading={fading}>
      <Logo src={onboarding} alt='logo' />
      <ServiceName>Goru{'\n'}Goru</ServiceName>
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fa6432;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: opacity 0.8s ease;
  opacity: ${({ $fading }) => ($fading ? 0 : 1)};
`

const Logo = styled.img`
  display: flex;
  width: 291px;
  height: 139px;
  margin-left: 58px;
  align-items: center;
  opacity: 0;
  animation: fadeIn 1.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`

const ServiceName = styled.p`
  color: #fff;
  text-align: center;
  font-size: 80px;
  font-weight: 700;
  line-height: 0.9;
  white-space: pre-line;
  margin-top: 20px;
  opacity: 0;
  animation: fadeInUp 1.5s forwards;
  animation-delay: 0.5s;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
