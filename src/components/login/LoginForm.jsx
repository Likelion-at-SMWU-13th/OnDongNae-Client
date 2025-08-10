import React from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 82.56%;
  border: 2px solid #b3b3b3;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
`

const Input = styled.input`
  color: black;
  font-size: 18px;
  font-weight: 600;
  padding: 13px 20px;
  border: none;
  outline: none;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }

  &:not(:last-child) {
    border-bottom: 2px solid #b3b3b3;
  }
`

function LoginForm() {
  return (
    <LoginContainer>
      <Input type='text' placeholder='아이디' />
      <Input type='password' placeholder='비밀번호' />
    </LoginContainer>
  )
}

export default LoginForm
