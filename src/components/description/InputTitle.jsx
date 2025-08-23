import React from 'react'
import styled from 'styled-components'

const InputTitle = ({ text }) => {
  return <Title>{text}</Title>
}

export default InputTitle

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`
