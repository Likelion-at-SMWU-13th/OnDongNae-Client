import React from 'react'
import styled from 'styled-components'

function TextField({ label = '', placeholder = '', value, onChange }) {
  return (
    <Container>
      <Text>{label}</Text>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required
      ></Input>
    </Container>
  )
}

export default TextField

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Text = styled.p`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Input = styled.input`
  width: 100%;
  height: 49px;
  color: black;
  border-radius: 10px;
  border: 2px solid #b3b3b3;
  background: #fff;
  padding: 14px 20px;
  font-size: 1.125rem;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }
`
