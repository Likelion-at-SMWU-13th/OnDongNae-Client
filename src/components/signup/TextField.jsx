import React from 'react'
import styled from 'styled-components'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Text = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Input = styled.input`
  width: 304px;
  height: 49px;
  color: black;
  border-radius: 10px;
  border: 2px solid #b3b3b3;
  background: #fff;
  padding: 14px 0 14px 20px;
  font-size: 18px;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }
`

const TextField = () => {
  return (
    <Container>
      <Text>이름</Text>
      <Input type='text' placeholder='아이디' required></Input>
    </Container>
  )
}

export default TextField
