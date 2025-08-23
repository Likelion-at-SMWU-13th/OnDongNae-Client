import React from 'react'
import styled from 'styled-components'

const Footer = ({ currentStep, totalSteps }) => {
  return (
    <Container>
      <ContentContainer>
        <Dots>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <Dot key={index} className={index === currentStep ? 'active' : ''} />
          ))}
        </Dots>
      </ContentContainer>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  width: min(100vw, 390px);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  height: 9vh;
  background: white;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Dots = styled.div`
  display: flex;
  gap: 10px;
`

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(218, 218, 218, 1);

  &.active {
    background: rgba(240, 142, 103, 1); // 단계 넘어갈 때마다 바뀌는 색
  }
`
