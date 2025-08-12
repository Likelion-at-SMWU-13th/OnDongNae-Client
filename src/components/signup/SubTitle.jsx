import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: pre-line;
`

function SubTitle({ text }) {
  return <Text>{text}</Text>
}

export default SubTitle
