import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 23px;
  font-weight: 600;
`

function Title({ text }) {
  return <Text>{text}</Text>
}

export default Title
