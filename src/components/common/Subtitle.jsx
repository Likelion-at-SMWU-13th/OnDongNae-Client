import React from 'react'
import styled from 'styled-components'

const StyledSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
`

function Subtitle({ text }) {
  return <StyledSubtitle>{text}</StyledSubtitle>
}

export default Subtitle
