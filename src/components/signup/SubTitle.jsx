import React from 'react'
import styled from 'styled-components'

function SubTitle({ text }) {
  return <Text>{text}</Text>
}

export default SubTitle

const Text = styled.p`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: pre-line;
`
