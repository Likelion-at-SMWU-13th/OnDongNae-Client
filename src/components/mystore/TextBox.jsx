import React from 'react'
import styled from 'styled-components'

const TextBox = ({ title, context }) => {
  return (
    <Box>
      <Title>{title}</Title>
      <Description>{context}</Description>
    </Box>
  )
}

export default TextBox

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  border-radius: 10px;
  background: rgba(217, 217, 217, 0.33);
  padding: 17px 23px 17px 14px;
`

const Title = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 500;
`

const Description = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 300;
  padding-left: 20px;
`
