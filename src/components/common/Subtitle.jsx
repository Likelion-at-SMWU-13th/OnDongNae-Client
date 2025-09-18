import React from 'react'
import styled from 'styled-components'

function Subtitle({ text }) {
  return <StyledSubtitle>{text}</StyledSubtitle>
}

export default Subtitle

const StyledSubtitle = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
`
