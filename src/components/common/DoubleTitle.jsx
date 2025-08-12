import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.p`
  font-size: 23px;
  font-weight: 600;
`
const StyledSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
`

const DoubleTitle = (title, subtitle) => {
  return (
    <div>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </div>
  )
}

export default DoubleTitle
