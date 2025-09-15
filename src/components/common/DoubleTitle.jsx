import React from 'react'
import styled from 'styled-components'

const DoubleTitle = ({ title, subtitle }) => {
  return (
    <TitleContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </TitleContainer>
  )
}

export default DoubleTitle

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 38px 0px 0px 30px;
  gap: 15px;
`

const StyledTitle = styled.p`
  font-size: 1.4375rem;
  font-weight: 600;
  white-space: pre-line;
`
const StyledSubtitle = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
`
