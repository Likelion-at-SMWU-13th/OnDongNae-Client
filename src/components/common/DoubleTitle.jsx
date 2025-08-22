import React from 'react'
import styled from 'styled-components'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 38px 0px 0px 30px;
  gap: 15px;
`

const StyledTitle = styled.p`
  font-size: 23px;
  font-weight: 600;
  white-space: pre-line;
`
const StyledSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
`

const DoubleTitle = ({ title, subtitle }) => {
  return (
    <TitleContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </TitleContainer>
  )
}

export default DoubleTitle
