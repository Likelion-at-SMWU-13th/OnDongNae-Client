import React from 'react'
import styled from 'styled-components'
import skipIcon from '@/assets/button-skip.svg'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  cursor: pointer;
`
const Text = styled.p`
  color: #7c7c7c;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const Img = styled.img``

const SkipButton = (onClick) => {
  return (
    <Container onClick={onClick}>
      <Text>건너뛰기</Text>
      <Img src={skipIcon} alt='Skip'></Img>
    </Container>
  )
}

export default SkipButton
