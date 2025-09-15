import React from 'react'
import styled from 'styled-components'
import skipIcon from '@/assets/button-skip.svg'

const SkipButton = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Text>건너뛰기</Text>
      <Img src={skipIcon} alt='Skip' />
    </Container>
  )
}

export default SkipButton

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`
const Text = styled.p`
  color: #7c7c7c;
  font-size: 1.125rem;
  font-weight: 600;
`

const Img = styled.img``
