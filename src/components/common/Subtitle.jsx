import React from 'react'
import styled from 'styled-components'

function Subtitle({ text }) {
  return <StyledSubtitle>{text}</StyledSubtitle>
}

export default Subtitle

const StyledSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
`
