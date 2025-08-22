import React from 'react'
import styled from 'styled-components'
import imgNext from '@/assets/img-next.svg'

const Footer = ({ currentStep, totalSteps, onNext }) => {
  return (
    <Container>
      <ContentContainer>
        <Dots>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <Dot key={index} className={index === currentStep ? 'active' : ''} />
          ))}
        </Dots>
        <ImgNext src={imgNext} onClick={onNext} />
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
  position: relative;
`
const Dots = styled.div`
  display: flex;
  gap: 10px;
`

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(218, 218, 218, 1); /* 기본 색 */

  &.active {
    background: rgba(240, 142, 103, 1); /* 활성화 색 */
  }
`
const ImgNext = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  position: absolute;
  left: 80%;
`
