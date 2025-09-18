import React from 'react'
import styled from 'styled-components'

function Title({ text }) {
  return <Text>{text}</Text>
}

export default Title

const Text = styled.p`
  font-size: 1.4375rem;
  font-weight: 600;
`
