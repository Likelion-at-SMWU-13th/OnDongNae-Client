import React from 'react'
import Spinner from '@/assets/Spinner2.gif'
import styled from 'styled-components'

const Loading = ({ text }) => {
  return (
    <div>
      <img src={Spinner} alt='Loading' width='110px' />
      <Text>{text} </Text>
    </div>
  )
}

export default Loading

const Text = styled.p`
  text-align: center;
  color: #000;
  font-size: 19px;
  font-weight: 500;
  margin-top: 5dvh;
`
